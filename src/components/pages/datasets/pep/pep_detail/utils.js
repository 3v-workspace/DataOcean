import { getLocaleField } from 'utils';
import i18n from 'i18next';

export const sortData = (dataForSort, field) => {
  if (field) {
    dataForSort.sort((prev, cur) => {
      if (prev[field].declared_at < cur[field].declared_at) {
        return 1;
      }
      if (prev[field].declared_at > cur[field].declared_at) {
        return -1;
      }
      return 0;
    });
  }
  return (
    dataForSort.sort((prev, cur) => {
      if (prev.declared_at < cur.declared_at) {
        return 1;
      }
      if (prev.declared_at > cur.declared_at) {
        return -1;
      }
      return 0;
    })
  );
};

export const prepareRelatedPersonData = (pep) => {
  if (!Object.keys(pep).length || (pep.from_person_links && !pep.from_person_links.length &&
    pep.to_person_links && !pep.to_person_links.length)) {
    return [];
  }

  const sortedRelatedPersonData = {
    family: [],
    business: [],
    personal: [],
    unknown: [],
  };

  const sortRelatedPerson = (data, field) => {
    data.forEach((person) => {
      if (!person.category) {
        person.category = 'unknown';
      }
      const duplicate = sortedRelatedPersonData[person.category].find((item) => (
        person[field].id === item.person.id
      ));
      if (!duplicate) {
        sortedRelatedPersonData[person.category].push(
          {
            person: person[field],
            type: person[`${field}_relationship_type`],
            type_en: person[`${field}_relationship_type_en`],
          },
        );
      }
    });
  };

  sortRelatedPerson(pep.from_person_links, 'to_person');
  sortRelatedPerson(pep.to_person_links, 'from_person');

  sortedRelatedPersonData.family.sort((prev, cur) => getLocaleField(prev, 'type').localeCompare(getLocaleField(cur, 'type')));

  return [sortedRelatedPersonData];
};

export const scrollToRef = (ref) => window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });

export const getColor = (data) => (data && data.length ? 'block-black' : 'block-gray');

export const otherCurrency = (object) => {
  let newCurrency = '';
  Object.entries(object).forEach(([key, value]) => {
    newCurrency += (!['USD', 'UAH', 'EUR'].includes(key)) ? `${key} ${value.toLocaleString(`${i18n.language}`)} ` : '';
  });
  return newCurrency.length ? newCurrency : '---';
};
