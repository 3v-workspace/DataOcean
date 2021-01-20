import React, { useEffect, useState } from 'react';
import Button from 'components/form-components/Button';
import Api, { baseUrl } from 'api';
import { useTranslation } from 'react-i18next';
import { Copy } from 'react-feather';

const ApiPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  const fetchData = () => {
    Api.get('payment/project/')
      .then((resp) => {
        setProjects(resp.data);
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
    <>
      <div className="intro-y mt-8 p-4 pb-16 box">
        <div className="py-4 pr-20 border-b border-gray-200">
          <h2 className="text-lg font-medium mr-auto">API</h2>
        </div>
        <div className="mt-4 text-gray-700 dark:text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium commodi</p>
          <p>possimus voluptates itaque asperiores quasi, vero assumenda cupiditate</p>
          <p>atque omnis perferendis illo expedita doloremque accusamus</p>
        </div>
        <Button type="button" className="px-8 mt-6 mb-10" href={`${baseUrl}/schema/redoc/`}>
          {t('viewApiDocumentation')}
        </Button>
        <h2 className="text-lg font-medium mr-auto">{t('projectsTokens')}</h2>
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
                    className={`border-b intro-x hover:bg-gray-100 ${project.is_active ? '' : 'text-gray-500'}`}
                  >
                    <td>{project.token}</td>
                    <td>{project.name}</td>
                    <td>{getProjectStatus(project)}</td>
                    <td>
                      <button
                        type="button"
                        variant="blank"
                        onClick={() => {
                          navigator.clipboard.writeText(project.token).then(
                            () => $.toast(t('tokenSavedToClipboard')),
                          );
                        }}
                      >
                        <Copy />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiPage;
