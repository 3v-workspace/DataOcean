import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import { X } from 'react-feather';
import TabContent from 'components/pages/profile/TabContent';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import Button from 'components/form-components/Button';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { BlankModal } from 'components/modals';
import { Form, TextInput } from 'components/form-components';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import Api from 'api';
import { DateFormat } from 'utils';
import { useTranslation } from 'react-i18next';
import Tooltip from 'components/Tooltip';
import toast from 'utils/toast';

const ProjectsTable = (props) => {
  const { match, history } = props;
  const { t } = useTranslation();
  const createProjectModalRef = useRef();
  const [projects, setProjects] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const fetchData = () => {
    Api.get('payment/project/')
      .then((resp) => {
        setProjects(resp.data);
      });
    Api.get('payment/invitations/')
      .then((resp) => {
        setInvitations(resp.data);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      Api.post('payment/project/create/', values)
        .then(() => {
          createProjectModalRef.current.hide();
          toast('success', 'Project created');
          fetchData();
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const getProjectStatus = (project) => {
    if (project.is_default) {
      return t('defaultProject');
    }
    if (project.is_active) {
      return t('active');
    }
    return t('deactivated');
  };

  const confirmInvitation = (invite) => {
    Api.post(`payment/project/${invite.project_id}/confirm-invite/`)
      .then(() => {
        toast('success', t('invitationConfirmed'));
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

  return (
    <TabContent>
      {!!invitations.length && (
        <TabContentBlock
          large
          title={t('invitation')}
        >
          <table className="table">
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
                  <td className="border-b">{DateFormat(invite.updated_at)}</td>
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
        </TabContentBlock>
      )}
      <TabContentBlock
        large
        title={t('projects')}
        headerContent={(
          <Tooltip content={t('inDevelopment')}>
            <Button
              disabled
              // onClick={() => createProjectModalRef.current.show()}
              width="w-48"
            >
              {t('addProject')}
            </Button>
          </Tooltip>
        )}
      >
        <BlankModal
          closeButton
          ref={createProjectModalRef}
          headerText={t('addProject')}
        >
          <Form className="p-5" formik={formik}>
            <TextInput
              required
              label={t('name')}
              name="name"
              formik={formik}
            />
            <TextInput
              textarea
              label={t('description')}
              name="description"
              // placeholder="Type your comments"
              formik={formik}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                className="px-8"
              >
                {t('create')}
              </Button>
            </div>
          </Form>
        </BlankModal>
        <div className="overflow-auto md:overflow-hidden">
          <table className="table">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>{t('projectName')}</th>
                <th>{t('owner')}</th>
                <th>{t('numberOfUsers')}</th>
                <th>{t('status')}</th>
                <th>{t('subscription')}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => history.push(`${match.url}${project.id}/`)}
                  className={`border-b intro-x hover:bg-gray-100 cursor-pointer ${project.is_active ? '' : 'text-gray-500'}`}
                >
                  <td>{project.name}</td>
                  <td>{project.owner}</td>
                  <td>{project.users_count}</td>
                  <td>{getProjectStatus(project)}</td>
                  <td>{project.active_subscription && project.active_subscription.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TabContentBlock>
    </TabContent>
  );
};


ProjectsTable.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default ProjectsTable;
