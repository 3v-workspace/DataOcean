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
import { dateFormat } from 'utils';


const ProjectsTable = (props) => {
  const { match, history } = props;
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
          $.toast('Project created');
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
      return 'Базовий проект';
    }
    if (project.is_active) {
      return 'Активний';
    }
    return 'Деактивований';
  };

  const confirmInvitation = (invite) => {
    Api.post(`payment/project/${invite.project_id}/confirm-invite/`)
      .then(() => {
        $.toast('Invitation confirmed');
        fetchData();
      });
  };

  const rejectInvitation = (invite) => {
    Api.delete(`payment/project/${invite.project_id}/reject-invite/`)
      .then(() => {
        $.toast('Invitation rejected');
        fetchData();
      });
  };

  return (
    <TabContent>
      {!!invitations.length && (
        <TabContentBlock
          large
          title="Запрошення"
        >
          <table className="table">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="whitespace-no-wrap">Назва проекту</th>
                <th className="whitespace-no-wrap">Дата запрошення</th>
                <th className="whitespace-no-wrap">Власник проекту</th>
                <th className="whitespace-no-wrap" />
              </tr>
            </thead>
            <tbody>
              {invitations.map((invite) => (
                <tr key={invite.project_id}>
                  <td className="border-b">{invite.project_name}</td>
                  <td className="border-b">{dateFormat(invite.updated_at)}</td>
                  <td className="border-b">{invite.project_owner}</td>
                  <td className="border-b">
                    <Button
                      isRounded
                      className="mr-2 px-4"
                      onClick={() => confirmInvitation(invite)}
                    >
                      Прийняти
                    </Button>
                    <Button
                      isRounded
                      className="px-4"
                      variant="secondary"
                      onClick={() => rejectInvitation(invite)}
                    >
                      Відхилити
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
        title="Проекти"
        headerContent={(
          <Button
            onClick={() => createProjectModalRef.current.show()}
            width="w-48"
          >
            Додати проект
          </Button>
        )}
      >
        <BlankModal
          closeButton
          ref={createProjectModalRef}
          headerText="Додати проект"
        >
          <Form className="p-5" formik={formik}>
            <TextInput
              required
              label="Назва"
              name="name"
              formik={formik}
            />
            <TextInput
              textarea
              label="Опис"
              name="description"
              placeholder="Type your comments"
              formik={formik}
            />
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              noFlex
              className="block ml-auto px-8"
            >
              Створити
            </Button>
          </Form>
        </BlankModal>
        <div className="overflow-auto md:overflow-hidden">
          <table className="table">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>Назва проекту</th>
                <th>Власник</th>
                <th>Кількість користувачів</th>
                <th>Статус</th>
                <th>Тарифний план</th>
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
