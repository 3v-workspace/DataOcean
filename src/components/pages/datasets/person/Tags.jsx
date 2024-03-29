import React from 'react';
import PropTypes from 'prop-types';
import { upFirstLetter } from 'utils';
import { useTranslation } from 'react-i18next';
import { scrollToElement } from 'components/blocks/utils';
import { Link } from 'react-router-dom';
import { PERSON_DEBUG } from 'const/testing';
import { OnePersonIcon } from 'components/pages/datasets/person/index';
import { personBlocks } from './const';
import { Criminal, Sanction } from '../../../blocks/index';

const Tags = (props) => {
  const { person, type } = props;
  const { t } = useTranslation();
  const list_tags = [
    {
      field: person.pep_data[0]?.pep_type_display,
      translation: '',
      id: ['member of PEP`s family', 'associated person with PEP'].includes(person.pep_data[0]?.pep_type) ?
        personBlocks.RELATED_PERSONS : personBlocks.MAIN_INFO,
      generateUrl: (tagId) => `/system/datasets/pep/${person.pep_data[0]?.id}/#${tagId}`,
      icon: OnePersonIcon,
    },
    {
      field: person.pep_data[0]?.criminal_proceedings,
      translation: 'criminalProceedings',
      id: personBlocks.CRIMINAL,
      generateUrl: (tagId) => `/system/datasets/pep/${person.pep_data[0]?.id}/#${tagId}`,
      icon: Sanction,
    },
    {
      field: person.sanction_data[0],
      translation: 'sanctionsDetail',
      id: personBlocks.SANCTION,
      generateUrl: (tagId) => `/system/datasets/person-sanction/${person.sanction_data[0].id}/`,
      icon: Criminal,
    },
  ];

  return type === 'detail' ? list_tags.map((tag, i) => (
    tag.field && (
      <div
        key={i}
        onClick={() => scrollToElement(tag.id)}
        className="py-1.5 px-6 border border-gray-700 rounded-full text-sm font-medium mr-3 mb-1 cursor-pointer"
        style={{ backgroundColor: '#E1F4FE', borderColor: '#7FD0FB' }}
      >
        {upFirstLetter(tag.translation ? t(tag.translation) : tag.field)}
      </div>
    )
  )) : list_tags.map((tag, i) => {
    const Icon = tag.icon;
    return tag.field && (
      <Link
        className="py-1.5 px-2.5 border border-gray-700 rounded-full text-sm font-medium mr-3 mb-1 cursor-pointer flex"
        to={PERSON_DEBUG ? tag.generateUrl(tag.id) : `/system/home/person/${person.id}/#${tag.id}`}
        style={{ backgroundColor: '#E1F4FE', borderColor: '#7FD0FB' }}
        key={i}
      >
        <Icon width={20} height={20} />
        <p className="ml-2">{upFirstLetter(tag.translation ? t(tag.translation) : tag.field)}</p>
      </Link>
    );
  });
};

Tags.propTypes = {
  person: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['search', 'detail']),
};

export default Tags;
