import React from 'react';
import PropTypes from 'prop-types';
import { upFirstLetter } from 'utils';
import { useTranslation } from 'react-i18next';
import { scrollToElement } from 'components/blocks/utils';
import { Link } from 'react-router-dom';
import { PERSON_DEBUG } from 'const/testing';
import { personBlocks } from './const';

const Tags = (props) => {
  const { person, type } = props;
  const { t } = useTranslation();
  const list_tags = [
    {
      field: person.pep_data[0],
      translation: 'mentionedInTheRegistersOfPEP',
      id: personBlocks.MAIN_INFO,
      generateUrl: (tagId) => `/system/datasets/pep/${person.pep_data[0]?.id}/#${tagId}`,
    },
    {
      field: person.pep_data[0]?.pep_type_display,
      translation: '',
      id: personBlocks.MAIN_INFO,
      generateUrl: (tagId) => `/system/datasets/pep/${person.pep_data[0]?.id}/#${tagId}`,
    },
    {
      field: person.pep_data[0]?.criminal_proceedings,
      translation: 'criminalProceedings',
      id: personBlocks.CRIMINAL,
      generateUrl: (tagId) => `/system/datasets/pep/${person.pep_data[0]?.id}/#${tagId}`,
    },
    {
      field: person.sanction_data[0],
      translation: 'sanctionsDetail',
      id: personBlocks.SANCTION,
      generateUrl: (tagId) => `/system/datasets/person-sanction/${person.sanction_data[0].id}/`,
    },
  ];

  return type === 'detail' ? list_tags.map((tag, i) => (
    tag.field && (
      <div
        key={i}
        onClick={() => scrollToElement(tag.id)}
        className="py-2 px-6 border border-gray-700 rounded-full text-sm font-medium mr-3 mb-1 cursor-pointer"
        style={{ backgroundColor: '#E1F4FE', borderColor: '#7FD0FB' }}
      >
        {upFirstLetter(tag.translation ? t(tag.translation) : tag.field)}
      </div>
    )
  )) : list_tags.map((tag, i) => (
    tag.field && (
      <Link
        className="px-3 border border-gray-700 rounded-full text-xs mr-2 mb-2"
        to={PERSON_DEBUG ? tag.generateUrl(tag.id) : `/system/home/person/${person.id}/#${tag.id}`}
        key={i}
      >
        {upFirstLetter(tag.translation ? t(tag.translation) : tag.field)}
      </Link>
    )
  ));
};

Tags.propTypes = {
  person: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['search', 'detail']),
};

export default Tags;
