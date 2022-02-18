import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import TabContent from 'components/pages/profile/TabContent';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import { BooleanInput, Button, TextInput } from 'components/form-components';
import {
  Copy, RefreshCcw, HelpCircle,
  Briefcase, X, Check, Trash, Trash2,
} from 'react-feather';
import Tooltip from 'components/Tooltip';
import { BlankModal, YesNoModal, DeleteModal } from 'components/modals';
import { useTranslation } from 'react-i18next';
import Api from 'api';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import { renderDate } from 'utils';
import Form from 'components/form-components/Form';
import { p2sStatus, u2pRole, u2pStatus } from 'const/projects';
import toast from 'utils/toast';
import moment from 'moment';
import { useDOCookies } from 'hooks';
import { useSelector } from 'react-redux';

const ProjectDetail = (props) => {
  const { match, history } = props;


  const { t } = useTranslation();
  const setCookie = useDOCookies()[1];

  const addUserModalRef = useRef();
  const refreshTokenModalRef = useRef();
  const leaveOrganizationModalRef = useRef();
  const disableUserModalRef = useRef();
  const deleteUserModalRef = useRef();
  const disableProjectModalRef = useRef();
  const updateProjectModalRef = useRef();
  const removeFutureModalRef = useRef();

  const user = useSelector((store) => store.user);
  const [project, setProject] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedSubscription, setSelectedSubscription] = useState({});
  const [showInvitations, setShowInvitations] = useState(false);
  const [verified, setVerified] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [projectId, setProjectId] = useState(match.params.id);

  const hasFutureSubscription = !!project.subscriptions?.find((s) => s.status === p2sStatus.FUTURE);

  const subsStatuses = {
    future: t('future'),
    active: t('active'),
    past: t('past'),
  };

  const fetchData = () => {
    Api.get(`payment/project/${projectId}/`)
      .then((resp) => {
        setProject(resp.data);
        if (resp.data.verified) {
          setVerified(true);
        }
      });
    Api.get('payment/invitations/')
      .then((resp) => {
        setInvitations(resp.data);
      });
  };

  const confirmInvitation = (invite) => {
    Api.post(`payment/project/${invite.project_id}/confirm-invite/`)
      .then(() => {
        toast('success', t('invitationConfirmed'));
        setProjectId(invite.project_id);
        fetchData();
      });
  };

  const rejectInvitation = (invite) => {
    Api.delete(`payment/project/${invite.project_id}/reject-invite/`)
      .then(() => {
        toast('warning', t('invitationRejected'));
        fetchData();
      });
  };

  const inviteUserFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
    }),
    onSubmit: (values, actions) => {
      Api.post(`payment/project/${projectId}/invite/`, values)
        .then(() => {
          toast('success', t('userInvited'));
          setShowInvitations(true);
        })
        .finally(() => {
          actions.setSubmitting(false);
          addUserModalRef.current.hide();
          fetchData();
        });
    },
  });

  const projectFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: project.name || '',
      description: project.description || '',
      detail_logging: project.detail_logging,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string(),
      detail_logging: Yup.boolean(),
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      Api.put(`payment/project/${projectId}/update/`, values)
        .then(() => {
          toast('success', t('projectUpdated'));
          fetchData();
          updateProjectModalRef.current.hide();
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const getProjectStatus = () => {
    if (project.is_owner) {
      return t('defaultProject');
    }
    return t('active');
  };

  const getUserStatus = (userProject) => {
    if (userProject.status === 'active') {
      return t('active');
    }
    return t('deactivated');
  };

  const handleAddUserClick = () => {
    addUserModalRef.current.show();
  };

  const openRefreshTokenModal = () => {
    refreshTokenModalRef.current.show();
  };


  const refreshToken = () => {
    Api.put(`payment/project/${projectId}/refresh-token/`)
      .then((resp) => {
        if (project.is_default) {
          setCookie('pt', resp.data.token);
        }
        toast('success', t('tokenRefreshed'));
        refreshTokenModalRef.current.hide();
        fetchData();
      });
  };

  const leaveOrganization = () => {
    console.log('Leave');
    Api.delete(`payment/project/${projectId}/self-delete/${user.id}/`)
      .then(() => {
        toast('warning', t('userWasDeleted'));
        leaveOrganizationModalRef.current.hide();
        fetchData();
      });
  };

  const openLeaveOrganizationModal = () => {
    leaveOrganizationModalRef.current.show();
  };

  const deactivateUser = () => {
    Api.delete(`payment/project/${projectId}/deactivate-user/${selectedUser.id}/`)
      .then(() => {
        toast('warning', t('userDeactivated'));
        disableUserModalRef.current.hide();
        fetchData();
      });
  };

  const activateUser = (userId) => {
    Api.put(`payment/project/${projectId}/activate-user/${userId}/`)
      .then(() => {
        toast('success', t('userActivated'));
        fetchData();
      });
  };

  const cancelInvite = (inviteId) => {
    Api.delete(`payment/project/${projectId}/cancel-invite/${inviteId}/`)
      .then(() => {
        toast('warning', t('invitationCanceled'));
        fetchData();
      });
  };

  const toggleUserActive = (user) => {
    if (user.status === u2pStatus.ACTIVE) {
      setSelectedUser(user);
      //disableUserModalRef.current.show();
    } else {
      activateUser(user.id);
    }
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    deleteUserModalRef.current.show();
  };

  const deleteUser = () => {
    Api.delete(`payment/project/${projectId}/delete-user/${selectedUser.id}/`)
      .then(() => {
        toast('success', t('userDeleted'));
        deleteUserModalRef.current.hide();
        fetchData();
      });
  };

  const disableProject = () => {
    Api.put(`payment/project/${projectId}/disable/`)
      .then(() => {
        toast('warning', t('projectDeactivated'));
        fetchData();
        disableProjectModalRef.current.hide();
      });
  };

  const activateProject = () => {
    Api.put(`payment/project/${projectId}/activate/`)
      .then(() => {
        toast('success', t('projectActivated'));
        fetchData();
      });
  };

  const removeFutureSubscription = () => {
    Api.delete(`payment/project/${projectId}/remove-future-subscription/`)
      .then(() => {
        toast('warning', t('subscriptionRemoved'));
        fetchData();
        removeFutureModalRef.current.hide();
      });
  };

  const toggleProjectActivity = () => {
    if (project.is_active) {
      disableProjectModalRef.current.show();
    } else {
      activateProject();
    }
  };

  // const getIsPaid = (subscription) => {
  //   if (subscription.price) {
  //     if (subscription.is_paid) {
  //       return t('paid');
  //     }
  //     return t('notPaid');
  //   }
  //   return '---';
  // };

  const getPaymentDateText = (subscription) => {
    if (subscription.status === p2sStatus.PAST) {
      return '---';
    }
    if (subscription.status === p2sStatus.ACTIVE && hasFutureSubscription) {
      return '---';
    }
    if (subscription.is_default) {
      return renderDate(subscription.expiring_date);
    }
    if (subscription.payment_overdue_days !== null) {
      if (subscription.payment_overdue_days === 0) {
        return <span className="text-orange-500 font-bold">{t('today')}</span>;
      }
      if (subscription.payment_overdue_days > 0) {
        return (
          <span className="text-red-500 font-bold">
            {t('overdueDays', { days: subscription.payment_overdue_days })}
          </span>
        );
      }
      return renderDate(subscription.payment_date);
    }
    return renderDate(subscription.payment_date);
  };

  if (!Object.keys(project).length) {
    return null;
  }

  // <Link to="/system/profile/projects/" className="flex items-center">
  //   <ChevronLeft className="w-4 h-4" />
  //   проєкти
  // </Link>

  return (
    <TabContent>
      <TabContentBlock
        large
        title={t('projectOverview')}
        headerContent={(
          <>
            <span className="mr-3 flex flex-row mr-10 pt-1">
              {t('status')}: <b className="ml-1">{getProjectStatus()}</b>
              {project.is_owner && (
                <Tooltip content={t('baseProjectCantBeDeactivated')}>
                  <HelpCircle className="cursor-pointer ml-2 h-5 w-5 text-theme-1" />
                </Tooltip>
              )}
              {!project.is_owner && (
                <Tooltip content={t('leaveOrganization')} noContainer>
                  <Button
                    variant="blank"
                    isRounded
                    onClick={openLeaveOrganizationModal}
                  >
                    <Trash2 className="w-5 h-5 -mt-3" />
                  </Button>
                </Tooltip>
              )}
            </span>
            {project.is_owner && (
              <>
                <Button
                  className="px-10"
                  size="sm"
                  variant="outline-primary"
                  onClick={() => updateProjectModalRef.current.show()}
                >
                  {t('edit')}
                </Button>
              </>
            )}
          </>
        )}
      >
        <YesNoModal
          ref={refreshTokenModalRef}
          header={`${t('refreshToken')}?`}
          message={t('afterRefreshTokenYouLoseAccess')}
          icon={RefreshCcw}
          onYes={refreshToken}
        />
        <DeleteModal
          ref={leaveOrganizationModalRef}
          header={`${t('leaveOrganization')}?`}
          message={t('userWillLeaveOrganization')}
          onDelete={leaveOrganization}
        />
        <DeleteModal
          ref={deleteUserModalRef}
          header={`${t('deleteUser')}?`}
          message={t('payment_system.deleteUserModalMessage', { name: selectedUser.name || '' })}
          onDelete={deleteUser}
        />
        <YesNoModal
          ref={disableUserModalRef}
          header={t('payment_system.disableUserModalHeader')}
          message={t('payment_system.disableUserModalMessage')}
          icon={HelpCircle}
          onYes={deactivateUser}
          yesLabel={t('deactivate')}
          noLabel={t('cancel')}
          // variant="warning"
        />
        <YesNoModal
          ref={disableProjectModalRef}
          header={t('payment_system.disableProjectModalHeader')}
          message={t('payment_system.disableProjectModalMessage')}
          icon={HelpCircle}
          onYes={disableProject}
          yesLabel={t('deactivate')}
          noLabel={t('cancel')}
          // variant="warning"
        />
        <YesNoModal
          ref={removeFutureModalRef}
          header={t('payment_system.removeFutureModalHeader', { subName: selectedSubscription.name || '' })}
          message={t('payment_system.removeFutureModalMessage')}
          icon={HelpCircle}
          onYes={removeFutureSubscription}
          // variant="warning"
        />
        <BlankModal
          ref={addUserModalRef}
          closeButton
          headerText={t('inviteUser')}
        >
          <Form className="p-5" formik={inviteUserFormik}>
            <TextInput
              name="email"
              type="email"
              label={t('enterUserEmail')}
              placeholder="E-mail"
              formik={inviteUserFormik}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={inviteUserFormik.isSubmitting}
                disabled={inviteUserFormik.isSubmitting}
                className="px-10"
              >
                {t('invite')}
              </Button>
            </div>
          </Form>
        </BlankModal>
        <BlankModal
          closeButton
          ref={updateProjectModalRef}
          headerText={t('editProject')}
        >
          <Form className="p-5" formik={projectFormik}>
            <TextInput
              required
              label={t('name')}
              name="name"
              formik={projectFormik}
            />
            {project.verified && (
              <p className="errorMessage" style={{ color: 'red' }}>{t('' +
                'Your Organisation will lose verification if the name will be changed.')}
              </p>
            )}
            <TextInput
              textarea
              label={t('description')}
              name="description"
              formik={projectFormik}
            />
            <BooleanInput
              label={t('logging')}
              name="detail_logging"
              formik={projectFormik}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={projectFormik.isSubmitting}
                disabled={projectFormik.isSubmitting}
                className="px-8"
              >
                {t('refresh')}
              </Button>
            </div>
          </Form>
        </BlankModal>
        <div className="truncate whitespace-normal flex items-center">
          <h3 className="intro-y text-2xl font-medium leading-none">
            {project.name}
          </h3>
          {project.verified && (
            <Tooltip content={t('Organization is verified')} noContainer>
              <Check className="w-8 h-8" />
            </Tooltip>
          )}
        </div>
        <div className="intro-y text-gray-500 text-sm my-4 mt-1">
          {t('created')}: {renderDate(project.created_at)}
        </div>
        <div className="intro-y text-gray-700 mb-8 w-2/3">
          {project.description}
        </div>
        <h6 className="intro-y font-medium leading-none mt-1">
          {t('accessToken')}:
        </h6>
        <div className="intro-y mt-2 mb-4 flex flex-wrap items-center justify-center sm:justify-start">
          <span className="px-5 py-2 rounded-full bg-gray-200 text-gray-600 mr-1">
            {project.token}
          </span>
          {project.is_owner && (
            <Tooltip content={t('refreshToken')} noContainer>
              <Button
                variant="blank"
                isRounded
                onClick={openRefreshTokenModal}
              >
                <RefreshCcw />
              </Button>
            </Tooltip>
          )}
          <Tooltip content={t('copyToken')} noContainer>
            <Button
              variant="blank"
              isRounded
              onClick={() => {
                navigator.clipboard.writeText(project.token).then(
                  () => toast('info', t('tokenSavedToClipboard')),
                );
              }}
            >
              <Copy />
            </Button>
          </Tooltip>
          <div className="w-full mt-2">
            <div>
              {t('toAccessRESTAddHeader')}:
            </div>
            <div className="text-theme-9">
              Authorization: DataOcean {project.token}
            </div>
          </div>
        </div>
        <h3 className="intro-y text-lg font-medium leading-none mt-10 mb-4">
          {t('users')}
        </h3>
        <div className="intro-y overflow-auto">
          <table className="table mb-2">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="w-1/3">{t('firstName')}</th>
                <th className="w-1/3">Email</th>
                <th className="w-1/3">{t('deleteUserFromOrganization')}</th>
              </tr>
            </thead>
            <tbody>
              {project.users.map((user) => (
                <tr key={user.name}>
                  <td className="border-b">
                    <div className="flex items-center">
                      {user.name}
                    </div>
                  </td>
                  <td className="border-b">{user.email}</td>
                  <td className="border-b">
                    <div className="flex items-center">
                      {user.role === u2pRole.OWNER && (
                        <Tooltip content={t('projectOwner')} noContainer>
                          <Briefcase className="w-4 h-4 text-theme-1 ml-1" />
                        </Tooltip>
                      )}
                      {user.role !== u2pRole.OWNER && project.is_owner && (
                        <Tooltip content={t('deleteFromProject')}>
                          <X
                            className="w-6 h-6 text-gray-500"
                            onClick={() => handleDeleteUserClick(user)}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {project.is_owner && (
          <div className="intro-y ">
            <Button
              // size="sm"
              disabled={!project.is_active}
              className="px-10"
              onClick={handleAddUserClick}
            >
              {t('inviteUser')}
            </Button>
            <a
              href=""
              className="text-theme-1 font-medium ml-3 whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                if (project.invitations.length) {
                  setShowInvitations(!showInvitations);
                }
              }}
            >
              {t('notConfirmedInvitation')}
              <sup>
                <span className="text-xs px-1 rounded-full bg-theme-1 text-white mr-1">
                  {project.invitations.length}
                </span>
              </sup>
            </a>
          </div>
        )}
        {showInvitations && !!project.invitations?.length && project.is_owner && (
          <div>
            <div className="intro-y overflow-auto">
              <table className="table my-2">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th>Email</th>
                    <th>{t('dateOfInvitation')}</th>
                    <th>{t('cancelInvitation')}</th>
                  </tr>
                </thead>
                <tbody>
                  {project.invitations.map((invite) => (
                    <tr key={invite.email}>
                      <td className="border-b w-1/3">{invite.email}</td>
                      <td className="border-b w-1/3">{renderDate(invite.updated_at)}</td>
                      <td className="border-b w-1/3">
                        <Button
                          size="sm"
                          className="px-6"
                          isRounded
                          onClick={() => cancelInvite(invite.id)}
                        >
                          {t('cancel')}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/*<div className="w-full border-t border-gray-200 my-5" />*/}
        <h3 className="intro-y text-lg font-medium leading-none mt-10 mb-4">
          {t('chosenSubscriptions')}
        </h3>
        <div className="intro-y overflow-auto">
          <table className="table mb-2">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="w-1/5">{t('name')}</th>
                <th className="w-1/5">{t('status')}</th>
                <th className="w-1/5">{t('requestsLeft')}</th>
                <th className="w-1/5">{t('nextPayment')} / {t('renewal')}</th>
                {project.is_owner && (
                  <th className="w-1/5">{t('invoices')}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {project.subscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className={`${subscription.status !== p2sStatus.PAST ? '' : 'text-gray-500'}`}
                >
                  <td className="border-b" style={{ verticalAlign: 'center' }}>
                    <div className="flex items-center">
                      {subscription.name}
                      {subscription.status === p2sStatus.FUTURE && (
                        <Button
                          variant="blank"
                          className="ml-2 p-0 mb-1"
                          onClick={() => {
                            setSelectedSubscription(subscription);
                            removeFutureModalRef.current.show();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="border-b">{subsStatuses[subscription.status]}</td>
                  <td className="border-b">
                    <b>{subscription.requests_left}</b>{' '}
                    {subscription.status !== p2sStatus.PAST && (
                      <span className="whitespace-nowrap">
                        (<RefreshCcw className="w-4 h-4 inline-block" />{' '}
                        {moment(subscription.renewal_date).format('D MMMM')})
                      </span>
                    )}
                  </td>
                  <td className="border-b">
                    {getPaymentDateText(subscription)}
                  </td>
                  {project.is_owner && (
                    <td className="border-b">
                      {subscription.status !== p2sStatus.FUTURE && !subscription.is_default ? (
                        <Button
                          variant="blank"
                          className="py-0 text-theme-1 block font-medium"
                          link={`${match.url}my-payments/${subscription.id}/`}
                        >
                          {t('viewInvoices')}
                        </Button>
                      ) : (
                        '---'
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {project.is_owner && (
          <div className="intro-y">
            <Button
              // size="sm"
              disabled={!project.is_active}
              className="px-10"
              onClick={() => history.push({
                pathname: '/system/subscriptions/',
                state: { fromProjects: true },
              })}
            >
              {t('changeSubscription')}
            </Button>
          </div>
        )}
        {!!invitations.length && project.is_owner && (
          <div className="intro-y overflow-auto">
            <h3 className="intro-y text-lg font-medium leading-none mt-10 mb-4">
              {t('invitation')}
            </h3>
            <table className="table mb-2">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="whitespace-no-wrap">{t('projectName')}</th>
                  <th className="whitespace-no-wrap">{t('dateOfInvitation')}</th>
                  <th className="whitespace-no-wrap">{t('projectOwner')}</th>
                  <th className="whitespace-no-wrap" />
                </tr>
              </thead>
              <tbody>
                {invitations.map((invite) => (
                  <tr key={invite.project_id}>
                    <td className="border-b">{invite.project_name}</td>
                    <td className="border-b">{renderDate(invite.updated_at)}</td>
                    <td className="border-b">{invite.project_owner}</td>
                    <td className="border-b">
                      <Button
                        isRounded
                        className="mr-2 px-4"
                        onClick={() => confirmInvitation(invite)}
                      >
                        {t('accept')}
                      </Button>
                      <Button
                        isRounded
                        className="px-4"
                        variant="secondary"
                        onClick={() => rejectInvitation(invite)}
                      >
                        {t('reject')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TabContentBlock>
    </TabContent>
  );
};

ProjectDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default ProjectDetail;
