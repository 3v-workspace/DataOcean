import { SOURCE, SOURCE_URL } from './const';

export const checkSource = (data) => {
  const sourceName = SOURCE[data.source];
  if (!sourceName) {
    throw new Error(`New type of source ${data.source}`);
  }
  return sourceName;
};

export const getSourceUrl = (data, person) => {
  let sanctionId;
  switch (data.source) {
    case Object.keys(SOURCE)[0]:
      return `${SOURCE_URL[data.source]}${person.pep_data[0].id}`;
    case Object.keys(SOURCE)[1]:
      sanctionId = person.sanction_data.find(
        (item) => item.decree.includes(data.year),
      );
      return `${SOURCE_URL[data.source]}${
        sanctionId ? sanctionId.id : person.sanction_data[0].id
      }`;
    default:
      return '';
  }
};
