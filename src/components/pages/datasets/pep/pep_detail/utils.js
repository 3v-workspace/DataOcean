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
  if (pep.from_person_links && !pep.from_person_links.length &&
    pep.to_person_links && !pep.to_person_links.length) {
    return [];
  }
  return [pep.from_person_links, pep.to_person_links];
};

export const scrollToRef = (ref) => window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });

export const getColor = (data) => (data && data.length ? 'block-black' : 'block-gray');
