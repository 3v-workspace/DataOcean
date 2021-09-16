import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Api from 'api';
import { HelpCircle, ArrowLeft, Download, Printer } from 'react-feather';
import { renderDate, getLocaleField } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import Tooltip from 'components/Tooltip';
import {
  Sanction, Criminal, Built, Car, Person, Career, Giftbox,
  Home, Money, Name, Wallet, Info, MainInfo, PepIcon, SpendMoney, MonetaryAssets,
  InformationBlock, AsyncInformationBlock, PepLiability, PepMonetaryAssets,
  PepMoney, PepProperty, PepSanction, PepVehicle, PepCareer, PepHtml,
  PepRelatedPerson, PepRelatedCompanies, PepOtherNames,
} from './pep_detail';
import { prepareRelatedPersonData } from './pep_detail/utils';

const blocks = {
  SANCTION: 'SANCTION',
  CAREER: 'CAREER',
  INCOME: 'INCOME',
  LIABILITY: 'LIABILITY',
  EXPENDITURE: 'EXPENDITURE',
  MONETARY_ASSETS: 'MONETARY_ASSETS',
  GIFT: 'GIFT',
  REAL_ESTATE: 'REAL_ESTATE',
  CAR: 'CAR',
};

const PepDetail = ({ match, history }) => {
  const defaultState = Object.keys(blocks).reduce((block, data) => {
    block[data] = [];
    return block;
  }, {});
  const [pep, setPepData] = useState({});
  const [data, setData] = useState(defaultState);
  const setDataForBlock = (blockId, newData) => {
    if (blockId === blocks.GIFT) {
      newData = newData.filter((item) => item.is_gift);
    }
    if (blockId === blocks.INCOME) {
      newData = newData.filter((item) => !item.is_gift);
    }
    setData((prevState) => ({ ...prevState, [blockId]: newData }));
  };
  const { id } = match.params;
  const { t } = useTranslation();
  const mainRef = useRef();
  const criminalRef = useRef();
  const sanctionRef = useRef();
  const relatedCompaniesRef = useRef();
  const careerRef = useRef();
  const incomeRef = useRef();
  const monetaryAssetsRef = useRef();
  const liabilityRef = useRef();
  const realEstateRef = useRef();
  const carRef = useRef();
  const otherNamesRef = useRef();
  const additionalInfoRef = useRef();
  const relatedPersonRef = useRef();
  const giftRef = useRef();
  const expendituresRef = useRef();
  const ASYNCBLOCK = 'ASYNCBLOCK';
  const INFOBLOCK = 'INFOBLOCK';

  const fetchData = () => {
    Api.get(`pep/${id}/`, {
      useProjectToken: true,
      params: { show_check_companies: 'none' },
    })
      .then((resp) => {
        setPepData(resp.data);
      });
  };

  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const getShortInfo = () => {
    const shortInfoFields = [
      { label: 'dateOfBirth', value: pep.date_of_birth, render: (value) => renderDate(value) },
      { label: 'isDead', value: pep.is_dead, render: (value) => (value ? t('yes') : null) },
      { label: 'terminationDatePep', value: pep.termination_date, render: (value) => renderDate(value) },
      { label: 'reasonOfTermination', value: pep.reason_of_termination },
      { label: 'placeOfBirth', value: pep.place_of_birth },
      { label: 'lastPosition', value: getLocaleField(pep, 'last_job_title') },
      { label: 'lastPlaceOfWork', value: getLocaleField(pep, 'last_employer') },
    ];
    return (
      <div className="flex flex-col">
        <div className="inline-flex mb-2">
          <div className="w-40 lg:w-64 font-medium">{t('pepDetailType')}:</div>
          <div className="max-w-xl">{pep.pep_type_display}</div>
          <HelpCircle className="w-4 h-4 ml-2 text-blue-600" />
        </div>
        {shortInfoFields.map((info, i) => (info.value && !(info.value === '---') ? (
          <div className="inline-flex mb-2" key={i}>
            <div className="w-40 lg:w-64 font-medium">{t(info.label)}:</div>
            <div className="max-w-xl">{info.render ? info.render(info.value) : info.value}</div>
          </div>
        ) : null))}
      </div>
    );
  };

  const getRelatedPersons = () => (
    <ul className="list-outside list-disc ml-4">
      {pep.from_person_links.map((person) => (
        <li key={person.to_person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'to_person_relationship_type')} —
          </span>
          <a
            className="capitalize cursor-pointer text-blue-800"
            href={match.url.replace(pep.id, person.to_person.id)}
          >
            {getLocaleField(person.to_person, 'fullname')}
          </a>
        </li>
      ))}
      {pep.to_person_links.map((person) => (
        <li key={person.from_person.id}>
          <span className="mr-1">
            {getLocaleField(person, 'from_person_relationship_type')} —
          </span>
          <a
            className="capitalize cursor-pointer text-blue-800"
            href={match.url.replace(pep.id, person.from_person.id)}
          >
            {getLocaleField(person.from_person, 'fullname')}
          </a>
        </li>
      ))}
    </ul>
  );

  const getRelatedCompanies = () => (
    <ul className="list-outside list-disc ml-4">
      {pep.related_companies.map((company, i) => (
        <li key={i}>
          <span>
            {getLocaleField(company, 'relationship_type')} - {getLocaleField(company.company, 'name')} ({company.company.edrpou})
          </span>
        </li>
      ))}
    </ul>
  );

  const getOtherSpelingNames = () => (
    <ul className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {pep.fullname_transcriptions_eng.split('\n').map((fullname, i) => (
        <li key={i}>
          {fullname}
        </li>
      ))}
    </ul>
  );

  const config = [
    {
      id: blocks.SANCTION,
      url: `pep/${id}/sanctions/`,
      title: t('sanctionsDetail'),
      titleIcon: Sanction,
      component: PepSanction,
      blockProps: { data: data.SANCTION },
      type: ASYNCBLOCK,
      ref: sanctionRef,
    },
    {
      id: 'CRIMINAL',
      title: t('criminalProceedings'),
      titleIcon: Criminal,
      component: PepHtml,
      blockProps: { data: pep.criminal_proceedings },
      type: INFOBLOCK,
      ref: criminalRef,
    },
    {
      id: 'RELATEDPERSONS',
      title: t('relatedPersons'),
      titleIcon: Person,
      component: PepRelatedPerson,
      blockProps: { pepId: pep.id, matchProps: match, data: prepareRelatedPersonData(pep) },
      type: INFOBLOCK,
      ref: relatedPersonRef,
    },
    {
      id: 'RELATEDCOMPANIES',
      title: t('relatedCompanies'),
      titleIcon: Built,
      component: PepRelatedCompanies,
      blockProps: { data: pep.related_companies },
      type: INFOBLOCK,
      ref: relatedCompaniesRef,
    },
    {
      id: blocks.CAREER,
      url: `pep/${id}/declaration/positions/`,
      title: t('career'),
      titleIcon: Career,
      component: PepCareer,
      blockProps: { data: data.CAREER },
      type: ASYNCBLOCK,
      ref: careerRef,
    },
    {
      id: blocks.INCOME,
      url: `pep/${id}/declaration/incomes/`,
      title: t('income'),
      titleIcon: Wallet,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.INCOME,
        type: blocks.INCOME,
        pepId: pep.id,
        ownerField: 'recipient',
      },
      ref: incomeRef,
    },
    {
      id: blocks.LIABILITY,
      url: `pep/${id}/declaration/liabilities/`,
      title: t('liability'),
      titleIcon: Money,
      component: PepLiability,
      blockData: data.LIABILITY,
      type: ASYNCBLOCK,
      blockProps: { data: data.LIABILITY, pepId: pep.id },
      ref: liabilityRef,
    },
    {
      id: blocks.EXPENDITURE,
      url: `pep/${id}/declaration/expenditures/`,
      title: t('expenditures'),
      titleIcon: SpendMoney,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.EXPENDITURE,
        type: blocks.EXPENDITURE,
        pepId: pep.id,
        ownerField: 'participant',
      },
      ref: expendituresRef,
    },
    {
      id: blocks.MONETARY_ASSETS,
      url: `pep/${id}/declaration/money/`,
      title: t('money'),
      titleIcon: MonetaryAssets,
      component: PepMonetaryAssets,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.MONETARY_ASSETS,
        pepId: pep.id,
      },
      ref: monetaryAssetsRef,
    },
    {
      id: blocks.GIFT,
      url: `pep/${id}/declaration/incomes/`,
      title: t('gift'),
      titleIcon: Giftbox,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        type: blocks.GIFT,
        pepId: pep.id,
        ownerField: 'recipient',
        data: data.GIFT,
      },
      ref: giftRef,
    },
    {
      id: blocks.REAL_ESTATE,
      url: `pep/${id}/declaration/property_rights/`,
      title: t('realEstate'),
      titleIcon: Home,
      component: PepProperty,
      type: ASYNCBLOCK,
      ref: realEstateRef,
      blockProps: { data: data.REAL_ESTATE },
    },
    {
      id: blocks.CAR,
      url: `pep/${id}/declaration/vehicle_rights/`,
      title: t('vehicles'),
      titleIcon: Car,
      component: PepVehicle,
      blockProps: { data: data.CAR },
      type: ASYNCBLOCK,
      ref: carRef,
    },
    {
      id: 'OTHERNAMES',
      title: t('otherNames'),
      titleIcon: Name,
      component: PepOtherNames,
      blockProps: { data: pep.fullname_transcriptions_eng },
      type: INFOBLOCK,
      ref: otherNamesRef,
    },
    {
      id: 'ADDITIONALINFO',
      title: t('additionalInfo'),
      titleIcon: Info,
      component: PepHtml,
      blockProps: { data: pep.info },
      type: INFOBLOCK,
      ref: additionalInfoRef,
    },
  ];

  const getHeader = () => {
    const sanctionBlock = config.find((item) => item.id === blocks.SANCTION);
    const criminalBlock = config.find((item) => item.id === 'CRIMINAL');
    return (
      <>
        <div
          className="border border-gray-400 rounded-full px-3 py-1 mr-2 cursor-pointer"
          onClick={() => scrollToRef(mainRef)}
        >
          {pep.pep_type_display}
        </div>
        {sanctionBlock.blockProps.data && sanctionBlock.blockProps.data.length ? (
          <div
            className="border border-gray-400 rounded-full px-3 py-1 cursor-pointer"
            onClick={() => scrollToRef(sanctionBlock.ref)}
          >
            {t(sanctionBlock.title)}
          </div>
        ) : null}
        {criminalBlock.blockProps.data && criminalBlock.blockProps.data.length ? (
          <div
            className="border border-gray-400 rounded-full px-3 py-1 ml-2 cursor-pointer"
            onClick={() => scrollToRef(criminalBlock.ref)}
          >
            {t(criminalBlock.title)}
          </div>
        ) : null}
      </>
    );
  };

  const getColor = (d) => (d && d.length ? 'black' : 'gray');

  const getAdditionalInfo = () => config.sort((prev, cur) => {
    if (prev.blockProps.data && prev.blockProps.data.length && !(cur.blockProps.data.length)) {
      return -1;
    }
    if (cur.blockProps.data.length && !(prev.blockProps.data.length)) {
      return 1;
    }
    return 0;
  }).map((block) => {
    const Component = block.component;
    if (block.type === ASYNCBLOCK) {
      return (
        <AsyncInformationBlock
          block={block}
          setDataForBlock={setDataForBlock}
          color={getColor}
          key={block.id}
        />
      );
    }
    return (
      <InformationBlock
        title={block.title}
        titleIcon={block.titleIcon}
        color={getColor(block.blockProps.data)}
        key={block.id}
        ref={block.ref}
      >
        <Component {...block.blockProps} />
      </InformationBlock>
    );
  });

  useTopBarHiddingEffect();

  useEffect(() => {
    fetchData();
  }, []);

  if (!Object.keys(pep).length) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="flex cursor-pointer font-bold text-l text-blue-800 my-5"
        onClick={() => history.goBack()}
      >
        <ArrowLeft className="h-5 ml-2" />
        {t('back')}
      </button>
      <div className="flex flex-row mb-2" ref={mainRef}>
        <div className="flex-auto w-5/6">
          <div className="intro-y box col-span-12 border border-gray-400 p-5">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-auto flex-col sm:flex-row items-start justify-start">
                <PepIcon />
                <div className="ml-6">
                  <div className="text-2xl font-medium capitalize">
                    {getLocaleField(pep, 'fullname')}
                  </div>
                  <div className="inline-flex mt-2 mb-4">
                    {getHeader()}
                  </div>
                  {getShortInfo()}
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <div className="flex flex-row text-blue-800 h-7">
                  <Tooltip content={t('inDevelopment')}>
                    <Printer className="mr-5" />
                  </Tooltip>
                  <Tooltip content={t('inDevelopment')}>
                    <Download className="mr-2" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          {getAdditionalInfo()}
        </div>
        <div className="w-1/6">
          <div className="box ml-2 border border-gray-400 fixed overflow-hidden">
            <ul className="list-none cursor-pointer">
              <div className="flex flex-row m-2" onClick={() => scrollToRef(mainRef)}>
                <MainInfo className="mr-2 w-5 h-5" fill="black" />
                {t('mainInformation')}
              </div>
              {config.map((info) => {
                const Icon = info.titleIcon;
                return (
                  <div key={info.id} className="flex flex-row m-2" onClick={() => scrollToRef(info.ref)}>
                    <Icon
                      className="mr-2 w-5 h-5"
                      fill={getColor(info.blockProps.data)}
                    />
                    {t(info.title)}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

PepDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PepDetail;
