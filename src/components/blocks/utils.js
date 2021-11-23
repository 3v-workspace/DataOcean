export const getColor = (data) => (data && data.length ? 'block-black' : 'block-gray');

export const scrollToElement = (id, position = 0) => {
  const element = document.getElementById(id);
  if (element) {
    if (position) {
      window.scrollTo({ top: element.offsetTop + position, behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

export const sortSanctionData = (data) => {
  const today = new Date().toISOString().slice(0, 10);
  data.sort((prev, cur) => {
    if (prev.end_date > cur.end_date) {
      return -1;
    }
    if (prev.end_date > cur.end_date) {
      return 1;
    }
    return 0;
  });

  data.map((sanction) => {
    if (sanction.types_of_sanctions[0] instanceof Object) {
      sanction.name_of_sanction = sanction.types_of_sanctions.reduce((names, type) => {
        names.push(type.name);
        return names;
      }, []);
    } else {
      sanction.name_of_sanction = sanction.types_of_sanctions;
    }
    return sanction;
  });

  const sanctions = data.reduce((allSanctions, sanction) => {
    if (sanction.end_date > today) {
      allSanctions.activeSanction.push(sanction);
    } else {
      allSanctions.inactiveSanction.push(sanction);
    }
    return allSanctions;
  }, { activeSanction: [], inactiveSanction: [] });

  return sanctions;
};

export const sortData = (dataForSort, field) => {
  if (!dataForSort.length) {
    return [];
  }
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

export const sortedCareerData = (data) => {
  sortData(data, '');
  return data.reduce((sortdata, career) => {
    const duplicate = sortdata.find((item) => (
      item.last_employer.trim().toLowerCase() === career.last_employer.trim().toLowerCase() &&
      item.last_job_title.trim().toLowerCase() === career.last_job_title.trim().toLowerCase()
    ));

    if (!duplicate || career.declared_at > duplicate.declared_at + 1) {
      sortdata.push(career);
    } else if (career.declared_at !== duplicate.declared_at) {
      duplicate.start_date = career.declared_at;
    }

    return sortdata;
  }, []);
};
