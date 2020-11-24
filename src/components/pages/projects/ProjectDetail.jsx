import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { ReactRouterPropTypes } from 'utils/prop-types';
import TabContent from 'components/pages/profile/TabContent';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import { BooleanInput, Button, TextInput } from 'components/form-components';
import { Copy, RefreshCcw, AlertTriangle, HelpCircle } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { BlankModal, YesNoModal } from 'components/modals';
import { useTranslation } from 'react-i18next';
import Api from 'api';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import { dateFormat } from 'utils';
import Form from 'components/form-components/Form';
import { u2pRole, u2pStatus } from 'const/projects';


const ProjectDetail = (props) => {
  const { match } = props;
  const projectId = match.params.id;

  const { t } = useTranslation();
  const addUserModalRef = useRef();
  const refreshTokenModalRef = useRef();
  const disableUserModalRef = useRef();
  const disableProjectModalRef = useRef();
  const updateProjectModalRef = useRef();

  const [project, setProject] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [showInvitations, setShowInvitations] = useState(false);

  const fetchData = () => {
    Api.get(`payment/project/${projectId}/`)
      .then((resp) => {
        setProject(resp.data);
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
        .then((resp) => {
          $.toast('User invited');
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
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      Api.put(`payment/project/${projectId}/update/`, values)
        .then((resp) => {
          $.toast('Project updated');
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
    if (project.is_default) {
      return 'Базовий проект';
    }
    if (project.is_active) {
      return 'Активний';
    }
    return 'Деактивований';
  };

  const getUserStatus = (userProject) => {
    if (userProject.status === 'active') {
      return 'Активний';
    }
    return 'Деактивований';
  };

  const handleAddUserClick = () => {
    addUserModalRef.current.show();
  };

  const openRefreshTokenModal = () => {
    refreshTokenModalRef.current.show();
  };

  const refreshToken = () => {
    Api.put(`payment/project/${projectId}/refresh-token/`)
      .then(() => {
        $.toast('Token refreshed');
        fetchData();
      });
  };

  const deactivateUser = () => {
    Api.delete(`payment/project/${projectId}/deactivate-user/${selectedUser.id}/`)
      .then((resp) => {
        $.toast('Користувач деактивований');
        disableUserModalRef.current.hide();
        fetchData();
      });
  };

  const activateUser = (userId) => {
    Api.put(`payment/project/${projectId}/activate-user/${userId}/`)
      .then((resp) => {
        $.toast('Користувач активований');
        fetchData();
      });
  };

  const cancelInvite = (inviteId) => {
    Api.delete(`payment/project/${projectId}/cancel-invite/${inviteId}/`)
      .then((resp) => {
        $.toast('Invitation canceled');
        fetchData();
      });
  };

  const toggleUserActive = (user) => {
    if (user.status === u2pStatus.ACTIVE) {
      setSelectedUser(user);
      disableUserModalRef.current.show();
    } else {
      activateUser(user.id);
    }
  };

  const disableProject = () => {
    Api.put(`payment/project/${projectId}/disable/`)
      .then((resp) => {
        $.toast('Проект деактивовано');
        fetchData();
        disableProjectModalRef.current.hide();
      });
  };

  const activateProject = () => {
    Api.put(`payment/project/${projectId}/activate/`)
      .then((resp) => {
        $.toast('Проект активовано');
        fetchData();
      });
  };

  const toggleProjectActivity = () => {
    if (project.is_active) {
      disableProjectModalRef.current.show();
    } else {
      activateProject();
    }
  };

  if (!Object.keys(project).length) {
    return null;
  }

  return (
    <TabContent>
      <TabContentBlock
        large
        title="View project"
        headerContent={(
          <>
            <span className="mr-3">
              Статус: <b>{getProjectStatus()}</b>
            </span>
            {project.is_owner && (
              <>
                {!project.is_default && (
                  <BooleanInput
                    readOnly
                    name="disable_project"
                    switchStyle
                    value={project.is_active}
                    onClick={toggleProjectActivity}
                  />
                )}
                <Button
                  className="px-10"
                  size="sm"
                  variant="outline-primary"
                  onClick={() => updateProjectModalRef.current.show()}
                >
                  Редагувати
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
        <YesNoModal
          ref={disableUserModalRef}
          header="Ви впевнені, що хочете деактивувати користувача?"
          message="Ви зможете активувати його в будь-який момент"
          icon={HelpCircle}
          onYes={deactivateUser}
          yesLabel="Деактивувати"
          noLabel="Відмінити"
          // variant="warning"
        />
        <YesNoModal
          ref={disableProjectModalRef}
          header="Ви впевнені, що хочете деактивувати проект?"
          message="Ви зможете активувати його в будь-який момент"
          icon={HelpCircle}
          onYes={disableProject}
          yesLabel="Деактивувати"
          noLabel="Відмінити"
          // variant="warning"
        />
        <BlankModal
          ref={addUserModalRef}
          closeButton
          headerText="Запросити користувача"
        >
          <Form className="p-5" formik={inviteUserFormik}>
            <TextInput
              name="email"
              type="email"
              label="Введіть E-mail користувача"
              placeholder="E-mail"
              formik={inviteUserFormik}
            />
            <Button
              type="submit"
              isLoading={inviteUserFormik.isSubmitting}
              disabled={inviteUserFormik.isSubmitting}
              className="px-5"
            >
              Запросити
            </Button>
          </Form>
        </BlankModal>
        <BlankModal
          closeButton
          ref={updateProjectModalRef}
          headerText="Редагувати проект"
        >
          <Form className="p-5" formik={projectFormik}>
            <TextInput
              required
              label="Назва"
              name="name"
              formik={projectFormik}
            />
            <TextInput
              textarea
              label="Опис"
              name="description"
              placeholder="Type your comments"
              formik={projectFormik}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={projectFormik.isSubmitting}
                disabled={projectFormik.isSubmitting}
                className="ml-auto px-8"
              >
                Оновити
              </Button>
            </div>
          </Form>
        </BlankModal>
        <h3 className="intro-y text-2xl font-medium leading-none">
          {project.name}
        </h3>
        <div className="intro-y text-gray-500 text-sm my-4 mt-1">
          Створено: {dateFormat(project.created_at)}
        </div>
        <div className="intro-y text-gray-700 mb-8 w-2/3">
          {project.description}
        </div>
        <h6 className="intro-y font-medium leading-none mt-1">
          Токен доступу:
        </h6>
        <div className="intro-y mt-2 mb-4 flex flex-wrap items-center justify-center sm:justify-start">
          <span className="px-5 py-2 rounded-full bg-gray-200 text-gray-600 mr-1">
            {project.token}
          </span>
          {project.is_owner && (
            <Tooltip content="Оновити токен">
              <Button
                variant="blank"
                // className="my-2"
                isRounded
                onClick={openRefreshTokenModal}
              >
                <RefreshCcw />
              </Button>
            </Tooltip>
          )}
          <Tooltip content="Копіювати токен">
            <Button
              variant="blank"
              // className="my-2"
              isRounded
              onClick={() => {
                navigator.clipboard.writeText(project.token).then(
                  () => $.toast('Токен збережений до буферу'),
                );
              }}
            >
              <Copy />
            </Button>
          </Tooltip>
        </div>

        <h3 className="intro-y text-lg font-medium leading-none mt-10 mb-4">
          Користувачі
        </h3>
        <div className="overflow-auto">
          <table className="intro-y table mb-2">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="whitespace-no-wrap">Ім'я</th>
                <th className="whitespace-no-wrap">Пошта</th>
                <th className="whitespace-no-wrap">Статус</th>
                <th className="whitespace-no-wrap">Роль</th>
                {project.is_owner && (
                  <th className="whitespace-no-wrap">Деактивувати</th>
                )}
              </tr>
            </thead>
            <tbody>
              {project.users.map((user) => (
                <tr key={user.name}>
                  <td className="border-b">{user.name}</td>
                  <td className="border-b">{user.email}</td>
                  <td className="border-b">{getUserStatus(user)}</td>
                  <td className="border-b">{user.role}</td>
                  {project.is_owner && (
                    <td className="border-b">
                      {user.role !== u2pRole.OWNER && (
                        <BooleanInput
                          readOnly
                          name={`${user.name}-is_active`}
                          switchStyle
                          value={user.status === 'active'}
                          onClick={() => toggleUserActive(user)}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {project.is_owner && (
          <>
            <Button
              // size="sm"
              className="intro-y px-10"
              onClick={handleAddUserClick}
            >
              Запросити користувача
            </Button>
            <a
              href=""
              className="intro-y text-theme-1 font-medium ml-3 whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                if (project.invitations.length) {
                  setShowInvitations(!showInvitations);
                }
              }}
            >
              Не підтвердили запрошення
              <sup>
                <span className="text-xs px-1 rounded-full bg-theme-1 text-white mr-1">
                  {project.invitations.length}
                </span>
              </sup>
            </a>
          </>
        )}
        {showInvitations && (
          <div className="overflow-auto">
            <table className="intro-y table my-2">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="whitespace-no-wrap">Пошта</th>
                  <th className="whitespace-no-wrap">Дата запрошення</th>
                  <th className="whitespace-no-wrap">Скасувати запрошення</th>
                </tr>
              </thead>
              <tbody>
                {project.invitations.map((invite) => (
                  <tr key={invite.email}>
                    <td className="border-b">{invite.email}</td>
                    <td className="border-b">{dateFormat(invite.updated_at)}</td>
                    <td className="border-b">
                      <Button
                        size="sm"
                        className="px-6"
                        isRounded
                        onClick={() => cancelInvite(invite.id)}
                      >
                        Скасувати
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}
        {/*<div className="w-full border-t border-gray-200 my-5" />*/}
        <h3 className="intro-y text-lg font-medium leading-none mt-10 mb-4">
          Обрані тарифні плани
        </h3>
        <div className="overflow-auto">
          <table className="intro-y table mb-2">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="whitespace-no-wrap">Назва</th>
                <th className="whitespace-no-wrap">Статус</th>
                <th className="whitespace-no-wrap">Вартість</th>
                <th className="whitespace-no-wrap">Переглянути оплату</th>
                <th className="whitespace-no-wrap">Дата закінчення</th>
              </tr>
            </thead>
            <tbody>
              {project.subscriptions.map((subscription, i) => (
                <tr key={i}>
                  <td className="border-b">{subscription.name}</td>
                  <td className="border-b">{subscription.status}</td>
                  <td className="border-b">{subscription.price}</td>
                  <td className="border-b">
                    <Button variant="blank" className="text-theme-1 block font-medium">
                      Оплата
                    </Button>
                  </td>
                  <td className="border-b">
                    {dateFormat(subscription.expiring_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {project.is_owner && (
          <Button
            // size="sm"
            className="intro-y px-10"
          >
            Змінити тарифний план
          </Button>
        )}
      </TabContentBlock>
    </TabContent>
  );
};

ProjectDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default ProjectDetail;
