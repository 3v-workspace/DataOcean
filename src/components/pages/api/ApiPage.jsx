import React, { useEffect, useState } from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import Button from 'components/form-components/Button';
import Api, { baseApiUrl } from 'api';
import { useTranslation } from 'react-i18next';
import { Copy } from 'react-feather';
import toast from 'utils/toasts';

const ApiPage = (props) => {
  const { t } = useTranslation();
  const { history } = props;
  const [projects, setProjects] = useState([]);
  const [defaultProject, setDefaultProject] = useState({});

  const fetchData = () => {
    Api.get('payment/project/')
      .then((resp) => {
        setProjects(resp.data);
        setDefaultProject(resp.data.find((project) => project.is_default));
      });
  };

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

  return (
    <div className="intro-y mt-8 p-4 pb-16 box">
      <div className="py-4 pr-20 border-b border-gray-200">
        <h2 className="text-lg font-medium mr-auto">API</h2>
      </div>
      <div className="mt-4 mb-4 text-gray-700 dark:text-gray-600" style={{ width: '25%' }}>
        <h2>{t('anEasyAccessToTheData')}</h2>
      </div>
      <Button type="button" className="px-8 mt-6 mb-10" href={`${baseApiUrl}/schema/redoc/`} target="_blank">
        {t('viewApiDocumentation')}
      </Button>
      <h2 className="text-lg font-medium mt-6">{t('projectsTokens')}</h2>
      <div className="w-full mt-2">
        <div>
          {t('toAccessRESTAddHeader')}:
        </div>
        <div className="text-theme-9">
          Authorization: DataOcean {defaultProject.token}
        </div>
      </div>
      <div className="intro-y mt-6 col-span-12">
        <div className="overflow-auto md:overflow-hidden">
          <table className="table">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th>{t('token')}</th>
                <th>{t('projectName')}</th>
                <th>{t('status')}</th>
                <th>{t('copy')}</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => history.push(`/system/profile/projects/${project.id}/`)}
                  className={`border-b intro-x hover:bg-gray-100 cursor-pointer ${project.is_active ? '' : 'text-gray-500'}`}
                >
                  <td>{project.token}</td>
                  <td>{project.name}</td>
                  <td>{getProjectStatus(project)}</td>
                  <td>
                    <Button
                      type="button"
                      variant="blank"
                      onClick={(event) => {
                        navigator.clipboard.writeText(project.token).then(
                          () => toast('info', t('tokenSavedToClipboard')),
                        );
                        event.stopPropagation();
                      }}
                      className="p-0"
                    >
                      <Copy className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


ApiPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default ApiPage;
