import React, { useEffect, useState } from 'react';
import { ReactRouterPropTypes } from 'utils/prop-types';
import Button from 'components/form-components/Button';
import Api, { baseApiUrl } from 'api';
import { useTranslation } from 'react-i18next';
import { Copy } from 'react-feather';

const ApiPage = (props) => {
  const { t } = useTranslation();
  const { match, history } = props;
  const [projects, setProjects] = useState([]);

  const fetchData = () => {
    Api.get('payment/project/')
      .then((resp) => {
        setProjects(resp.data);
      });
  };

  const projectUrl = `${match.url.replace('api/', '')}profile/projects/`;

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
      <Button type="button" className="px-8 mt-6 mb-10" href={`${baseApiUrl}/schema/redoc/`}>
        {t('viewApiDocumentation')}
      </Button>
      <h2 className="text-lg font-medium mt-6">{t('projectsTokens')}</h2>
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
                  className={`border-b intro-x hover:bg-gray-100 cursor-pointer ${project.is_active ? '' : 'text-gray-500'}`}
                >
                  <td onClick={() => history.push(`${projectUrl}${project.id}/`)}>{project.token}</td>
                  <td onClick={() => history.push(`${projectUrl}${project.id}/`)}>{project.name}</td>
                  <td onClick={() => history.push(`${projectUrl}${project.id}/`)}>{getProjectStatus(project)}</td>
                  <td>
                    <Button
                      type="button"
                      variant="blank"
                      onClick={() => {
                        navigator.clipboard.writeText(project.token).then(
                          () => $.toast(t('tokenSavedToClipboard')),
                        );
                      }}
                      className="px-0"
                    >
                      <Copy />
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
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default ApiPage;
