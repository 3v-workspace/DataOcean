import React, { useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { useLocation, Link } from 'react-router-dom';
import Api from 'api';
import { setOverflow } from 'store/interface/actionCreators';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import useScrollToEffect from 'hooks/useScrollToEffect';
import { useDispatch } from 'react-redux';
import { Download, HelpCircle } from 'react-feather';
import Tooltip from 'components/Tooltip';
import { renderDate } from 'utils/dateTime';
import ButtonBackDetailPage from 'components/ButtonBackDetailPage';
import {
  PepIcon, Print, Built, Criminal, MainInfo, Person, Career, Wallet, Money, SpendMoney,
  MonetaryAssets, Giftbox, Home, Car, IntangibleAssetsIcon, Info, Sanction, BlackLine,
  Name, File,
} from 'components/blocks/index';
import { getLocaleField, upFirstLetter } from 'utils';
import { checkSource, getSourceUrl } from './utils';
import { personBlocks, SOURCE, STATUS_BLOCK } from './const';
import {
  CriminalBlock, RelatedPersonBlock, RelatedCompaniesBlock, InformationBlock, Menu,
  SanctionBlock, Tags, CareerBlock, OtherNames,
} from './index';
import { checkPepType } from '../pep/pep_detail/utils';
import { sortedCareerData } from '../../../blocks/utils';
import { DataSourceLabel } from './DataSourceLabel';

const PersonDetail = ({ match, history }) => {
  const location = useLocation();
  const { id } = match.params;
  const { t, i18n } = useTranslation();
  const [person, setPersonData] = useState({});
  const dispatch = useDispatch();
  const [open, setOpen] = useState([...Object.keys(personBlocks)].reduce((allBlock, block) => {
    allBlock[block] = true;
    return allBlock;
  }, {}));
  const setOpenBlock = (blockId, value = false) => {
    setOpen((prevState) => {
      const newState = value || !prevState[blockId];
      return { ...prevState, [blockId]: newState };
    });
  };

  const fetchData = () => {
    Api.get(`/person/${id}/`, { useProjectToken: true })
      .then((resp) => {
        const person = resp.data;
        person.position_data.sort((prev, cur) => {
          if (prev.year === null) {
            return -1;
          }
          if (prev.year) {
            if (prev.year < cur.year) {
              return 1;
            }
            if (prev.year > cur.year) {
              return -1;
            }
          }
          return 0;
        }).sort((a, b) => {
          if (a.source < b.source) {
            return -1;
          }
          if (a.source > b.source) {
            return 1;
          }
          return 0;
        });
        setPersonData(person);
      });
  };

  const extractIdCartData = (id_card_data) => (
    <tr>
      <td className="w-40 lg:w-64 font-medium py-1 align-top">
        {t('passports')}:
      </td>
      <td className="max-w-xl">
        {id_card_data.map((number) => (
          <p className="pb-1" key={number.id}>
            {number.id_card ? number.id_card : number.passports.join(', ')}
            <DataSourceLabel person={person} data={number} />
          </p>
        ))}
      </td>
    </tr>
  );

  const getShortInformation = () => {
    const shortInfoPerson = [
      { label: 'dateOfBirth', value: person.date_of_birth, render: (value) => renderDate(value) },
      {
        label: 'placeOfResidence',
        value: person.residence_data.filter((residence) => residence.residence),
        render: (value) => value.map((item, i) => (
          <p className="pb-1" key={i}>
            {`${i + 1}. ${item.residence} `}
            ({renderDate(item.year.toString())})
            <DataSourceLabel person={person} data={item} />
          </p>
        )),
      },
      {
        label: 'alsoKnownAs',
        value: person.other_names,
        render: (value) => {
          const groupNames = {
            1: [],
            2: [],
            3: [],
            4: [],
          };
          value.forEach((name) => groupNames[name.type]?.push(name));
          return Object.values(groupNames).map((typeName, index) => (
            <Fragment key={index}>
              {typeName[0] && (
                <p className="pb-1">
                  {typeName.map((name, i) => (
                    <span key={name.id}> {name.name}{(typeName.length - 1 !== i) && ', '}</span>
                  ))}
                  &emsp;&mdash;&emsp;{typeName[0].type_display}
                </p>
              )}
            </Fragment>
          ));
        },
      },
      {
        label: 'citizenship',
        value: person.citizenship_data.filter((citizenship) => getLocaleField(citizenship, 'name')),
        render: (value) => value.map((item, i) => (
          <p className="pb-1" key={item.id}>
            {`${i + 1}. ${getLocaleField(item, 'name')}`}
            <DataSourceLabel person={person} data={item} isLink={false} />
          </p>
        )),
      },
      { label: 'gender', value: person.gender_display },
    ];

    const getLastPosition = (position_data) => {
      const filteredData = position_data.filter((item) => item?.position !== '');
      const lastPositions = [];
      filteredData.forEach((pos) => {
        if (!(pos.source in lastPositions)) {
          lastPositions[pos.source] = pos;
        }
      });

      return (
        <>
          <tr>
            <td className="w-40 lg:w-64 align-top font-medium py-1">{t('lastPosition')}:</td>
            <td className="max-w-xl py-1">
              <ul>
                {Object.values(lastPositions).map((pos) => (
                  <li key={`${pos.position}-${pos.source}`}>
                    {getLocaleField(pos, 'position')}
                    <DataSourceLabel person={person} data={pos} />
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </>
      );
    };

    return (
      <>
        <table className="flex">
          <tbody>
            {shortInfoPerson.map((info) => (info.value && info.value.length ? (
              <tr key={info.label}>
                <td className="w-40 lg:w-64 font-medium py-1 align-top">{t(info.label)}:</td>
                <td className="max-w-xl whitespace-pre-line">{info.render ? info.render(info.value) : info.value}</td>
              </tr>
            ) : null))}
          </tbody>
        </table>
        <hr className="mt-5 mb-4" style={{ color: '#BBBBBB' }} />
        <table className="flex">
          <tbody>
            {person.pep_data.length ? (
              <tr>
                <td className="w-40 lg:w-64 font-medium py-1 align-top">{t('pepType')}:</td>
                <td className="max-w-xl flex py-1">
                  <Link
                    to={{
                      pathname: '/system/help/',
                      state: { pathnumber: 16 },
                    }}
                  >
                    {person.pep_data[0]?.pep_type_display}
                  </Link>
                  <Tooltip
                    className="w-70 md:w-auto"
                    position="right"
                    content={t(checkPepType(person.pep_data[0]?.pep_type))}
                  >
                    <HelpCircle className="w-4 h-4 ml-2 text-blue-600" />
                  </Tooltip>
                </td>
              </tr>
            ) : null}
            {person.taxpayer_number_data.filter((number) => number.taxpayer_number !== '').length ? (
              <tr>
                <td className="w-40 lg:w-64 font-medium py-1 align-top">
                  {t('taxpayerNumber')}:
                </td>
                <td className="max-w-xl py-1">
                  {person.taxpayer_number_data.map((number, i) => (
                    <p key={i}>
                      {number.taxpayer_number}
                      <DataSourceLabel person={person} data={number} />
                    </p>
                  ))}
                </td>
              </tr>
            ) : null}
            {person.id_card_data.filter(
              (number) => number.id_card || number.passports.length,
            ).length ? (extractIdCartData(person.id_card_data)) : null}
            {person.position_data.filter((item) => item?.position !== '').length ?
              getLastPosition(person.position_data) : null}
          </tbody>
        </table>
      </>
    );
  };

  const config = [
    {
      id: personBlocks.SANCTION,
      title: 'sanctionsDetail',
      titleIcon: Sanction,
      blockProps: {
        data: person.sanction_data && person.sanction_data.length ? person.sanction_data :
          [{ noSanction: t('noSanction') }],
      },
      component: SanctionBlock,
      status: STATUS_BLOCK.isInformation,
    },
    {
      id: personBlocks.CRIMINAL,
      title: 'criminalProceedings',
      titleIcon: Criminal,
      blockProps: {
        data: person.pep_data?.length && person.pep_data[0].criminal_proceedings ?
          person.pep_data[0].criminal_proceedings : [{ noCriminal: t('noCriminal') }],
      },
      component: CriminalBlock,
      status: STATUS_BLOCK.isInformation,
    },
    {
      id: personBlocks.RELATED_PERSONS,
      title: 'relatedPersons',
      titleIcon: Person,
      blockProps: {
        data: person.related_person_data,
        matchProps: match,
        personId: person.id,
      },
      component: RelatedPersonBlock,
      status: null,
    },
    {
      id: personBlocks.RELATED_COMPANIES,
      title: 'relatedCompanies',
      titleIcon: Built,
      blockProps: {
        data: person.related_company_data,
        relationField: 'link_category_display',
        withTranslation: false,
      },
      component: RelatedCompaniesBlock,
      status: null,
    },
    {
      id: personBlocks.CAREER,
      title: 'career',
      titleIcon: Career,
      component: CareerBlock,
      blockProps: {
        data: person.position_data,
        person,
      },
      status: null,
    },
    {
      id: personBlocks.OTHER_NAMES,
      title: 'otherNames',
      titleIcon: Name,
      component: OtherNames,
      blockProps: {
        data: person.full_name_options,
      },
      status: null,
    },
    {
      id: personBlocks.DECLARATION_BLOCK,
      title: 'declarations',
      titleIcon: File,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.INCOME,
      title: 'income',
      titleIcon: Wallet,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.LIABILITY,
      title: 'liability',
      titleIcon: Money,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.EXPENDITURE,
      title: 'expenditures',
      titleIcon: SpendMoney,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.MONETARY_ASSETS,
      title: 'money',
      titleIcon: MonetaryAssets,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.INTANGIBLE_ASSETS,
      title: 'intangibleAssets',
      titleIcon: IntangibleAssetsIcon,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.GIFT,
      title: 'gift',
      titleIcon: Giftbox,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.REAL_ESTATE,
      title: 'realEstate',
      titleIcon: Home,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.CAR,
      title: 'vehicles',
      titleIcon: Car,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
    {
      id: personBlocks.COINCIDENCE_BLOCK,
      title: 'highCoincidence',
      titleIcon: Info,
      blockProps: {
        data: [],
      },
      status: STATUS_BLOCK.inDevelopment,
    },
  ];

  const getAdditionalInfo = () => config.sort((prev, cur) => {
    if (prev.blockProps.data && prev.blockProps.data.length && !(cur.blockProps.data.length)) {
      prev.status = STATUS_BLOCK.isInformation;
      cur.status = STATUS_BLOCK.noInformation;
      return -1;
    }
    if (cur.blockProps.data.length && !(prev.blockProps.data.length)) {
      prev.status = STATUS_BLOCK.noInformation;
      cur.status = STATUS_BLOCK.isInformation;
      return 1;
    }
    return 0;
  }).map((block, i) => {
    const Component = block.component;
    return (
      <Fragment key={block.id}>
        <InformationBlock
          block={block}
          open={open}
          setOpenBlock={setOpenBlock}
        >
          {Component ? (
            <Component {...block.blockProps} />
          ) : null}
        </InformationBlock>
        {!!(
          config[i + 1] &&
          !config[i + 1].blockProps.data.length &&
          config[i + 1].component &&
          block.blockProps.data.length
        ) && (
          <div className="block-gray items-center font-medium text-lg mt-10 mb-2">
            {t('noInformation')}
          </div>
        )}
        {config[i + 1] && !config[i + 1].component && config[i].component ? (
          <div className="block-gray items-center font-medium text-lg mt-10 mb-2">
            {t('informationInDevelopment')}
          </div>
        ) : null}
      </Fragment>
    );
  });

  useTopBarHiddingEffect();

  useScrollToEffect(location, person, 20);

  useEffect(() => {
    dispatch(setOverflow(false));
    fetchData();
    return () => {
      dispatch(setOverflow(true));
    };
  }, []);

  if (!Object.keys(person).length) {
    return null;
  }

  return (
    <>
      <ButtonBackDetailPage />
      <div className="intro-y flex pb-16" id={personBlocks.MAIN_INFO}>
        <div className="flex-grow mr-8 w-px space-y-6 leading-6">
          <div className="bg-white flex flex-col box-border box-border-radius-0.5 intro-x rounded-lg">
            <div className={`flex lg:px-6 ${person.is_dead ? 'pt-8' : 'py-8'}`}>
              <div><PepIcon width={170} height={170} /></div>
              <div className="flex-grow block-black pl-0 lg:pl-6">
                <div className="flex flex-row justify-between">
                  <div className="fullname-text">
                    {i18n.language === 'en' ? `${person.last_name} ${person.first_name} ${person.middle_name}` : person.full_name_original}
                  </div>
                  <Tooltip
                    content={t('inDevelopment')}
                    position="top"
                    noContainer
                  >
                    <div className="flex pt-1">
                      <Download className="h-6 mr-8" />
                      <Print className="h-6" />
                    </div>
                  </Tooltip>
                </div>
                <div className="flex flex-wrap mt-4 mb-4">
                  <Tags person={person} type="detail" />
                </div>
                {getShortInformation()}
              </div>
            </div>
            <div
              className={`flex justify-end -mb-1 ${person.is_dead ? '' : 'hidden'}`}
            >
              <BlackLine width={60} height={60} />
            </div>
          </div>
          {getAdditionalInfo()}
        </div>
        <Menu
          config={config}
          mainBlock={
            { id: personBlocks.MAIN_INFO, icon: MainInfo }
          }
          setOpenBlock={setOpenBlock}
        />
      </div>
    </>
  );
};

PersonDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PersonDetail;
