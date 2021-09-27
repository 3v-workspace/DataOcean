import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Api from 'api';
import { useDispatch } from 'react-redux';
import { setOverflow } from 'store/interface/actionCreators';
import { HelpCircle, ArrowLeft, Download } from 'react-feather';
import { renderDate, getLocaleField } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import Tooltip from 'components/Tooltip';
import {
  Sanction, Criminal, Built, Car, Person, Career, Giftbox, Print, Info,
  Home, Money, Name, Wallet, MainInfo, PepIcon, SpendMoney, MonetaryAssets,
  InformationBlock, AsyncInformationBlock, PepCriminal, PepLiability, PepMonetaryAssets,
  PepMoney, PepProperty, PepSanction, PepVehicle, PepCareer, PepHtml,
  PepRelatedPerson, PepRelatedCompanies, PepOtherNames, PepMenu,
} from './pep_detail';
import { prepareRelatedPersonData, scrollToRef, getColor } from './pep_detail/utils';
import { asyncBlocks, pepBlocks, ASYNCBLOCK, INFOBLOCK } from './pep_detail/const';


const PepDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  const defaultState = Object.keys(asyncBlocks).reduce((block, data) => {
    block[data] = [];
    return block;
  }, {});
  const defaulIsOpenState = [
    ...Object.keys(pepBlocks), ...Object.keys(asyncBlocks),
  ].reduce((allBlock, block) => {
    allBlock[block] = true;
    return allBlock;
  }, {});
  const [pep, setPepData] = useState({});
  const [data, setData] = useState(defaultState);
  const setDataForBlock = (blockId, newData) => {
    if (blockId === asyncBlocks.GIFT) {
      newData = newData.filter((item) => item.is_gift);
    }
    if (blockId === asyncBlocks.INCOME) {
      newData = newData.filter((item) => !item.is_gift);
    }
    setData((prevState) => ({ ...prevState, [blockId]: newData }));
  };
  const [open, setOpen] = useState(defaulIsOpenState);
  const setOpenBlock = (blockId, value = false) => {
    setOpen((prevState) => {
      const newState = value || !prevState[blockId];
      return { ...prevState, [blockId]: newState };
    });
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

  const fetchData = () => {
    Api.get(`pep/${id}/`, {
      useProjectToken: true,
      params: { show_check_companies: 'none' },
    })
      .then((resp) => {
        setPepData(resp.data);
      });
  };

  const config = [
    {
      id: asyncBlocks.SANCTION,
      url: `pep/${id}/sanctions/`,
      title: t('sanctionsDetail'),
      titleIcon: Sanction,
      component: PepSanction,
      blockProps: { data: data.SANCTION && data.SANCTION.length ? data.SANCTION : [{ noSanction: t('noSanction') }] },
      type: ASYNCBLOCK,
      ref: sanctionRef,
    },
    {
      id: pepBlocks.CRIMINAL,
      title: t('criminalProceedings'),
      titleIcon: Criminal,
      component: PepCriminal,
      blockProps: { data: pep.criminal_proceedings ? pep.criminal_proceedings : [{ noCriminal: t('noCriminal') }] },
      type: INFOBLOCK,
      ref: criminalRef,
    },
    {
      id: pepBlocks.RELATED_PERSONS,
      title: t('relatedPersons'),
      titleIcon: Person,
      component: PepRelatedPerson,
      blockProps: { pepId: pep.id, matchProps: match, data: prepareRelatedPersonData(pep) },
      type: INFOBLOCK,
      ref: relatedPersonRef,
    },
    {
      id: pepBlocks.RELATED_COMPANIES,
      title: t('relatedCompanies'),
      titleIcon: Built,
      component: PepRelatedCompanies,
      blockProps: { data: pep.related_companies },
      type: INFOBLOCK,
      ref: relatedCompaniesRef,
    },
    {
      id: asyncBlocks.CAREER,
      url: `pep/${id}/declaration/positions/`,
      title: t('career'),
      titleIcon: Career,
      component: PepCareer,
      blockProps: { data: data.CAREER },
      type: ASYNCBLOCK,
      ref: careerRef,
    },
    {
      id: asyncBlocks.INCOME,
      url: `pep/${id}/declaration/incomes/`,
      title: t('income'),
      titleIcon: Wallet,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.INCOME,
        type: asyncBlocks.INCOME,
        pepId: pep.id,
        ownerField: 'recipient',
      },
      ref: incomeRef,
    },
    {
      id: asyncBlocks.LIABILITY,
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
      id: asyncBlocks.EXPENDITURE,
      url: `pep/${id}/declaration/expenditures/`,
      title: t('expenditures'),
      titleIcon: SpendMoney,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.EXPENDITURE,
        type: asyncBlocks.EXPENDITURE,
        pepId: pep.id,
        ownerField: 'participant',
      },
      ref: expendituresRef,
    },
    {
      id: asyncBlocks.MONETARY_ASSETS,
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
      id: asyncBlocks.GIFT,
      url: `pep/${id}/declaration/incomes/`,
      title: t('gift'),
      titleIcon: Giftbox,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        type: asyncBlocks.GIFT,
        pepId: pep.id,
        ownerField: 'recipient',
        data: data.GIFT,
      },
      ref: giftRef,
    },
    {
      id: asyncBlocks.REAL_ESTATE,
      url: `pep/${id}/declaration/property_rights/`,
      title: t('realEstate'),
      titleIcon: Home,
      component: PepProperty,
      type: ASYNCBLOCK,
      ref: realEstateRef,
      blockProps: { data: data.REAL_ESTATE },
    },
    {
      id: asyncBlocks.CAR,
      url: `pep/${id}/declaration/vehicle_rights/`,
      title: t('vehicles'),
      titleIcon: Car,
      component: PepVehicle,
      blockProps: { data: data.CAR },
      type: ASYNCBLOCK,
      ref: carRef,
    },
    {
      id: pepBlocks.OTHER_NAMES,
      title: t('otherNames'),
      titleIcon: Name,
      component: PepOtherNames,
      blockProps: { data: pep.fullname_transcriptions_eng },
      type: INFOBLOCK,
      ref: otherNamesRef,
    },
    {
      id: pepBlocks.ADDITIONAL_INFO,
      title: t('additionalInfo'),
      titleIcon: Info,
      component: PepHtml,
      blockProps: { data: pep.info || [] },
      type: INFOBLOCK,
      ref: additionalInfoRef,
    },
  ];

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
      <div className="flex flex-col block-black">
        <div className="inline-flex mb-3">
          <div className="w-40 lg:w-64 font-bold">{t('pepDetailType')}:</div>
          <div className="max-w-xl">{pep.pep_type_display}</div>
          {/*<HelpCircle className="w-4 h-4 ml-2 text-blue-600" />*/}
        </div>
        {shortInfoFields.map((info, i) => (info.value && !(info.value === '---') ? (
          <div className="inline-flex mb-3" key={i}>
            <div className="w-40 lg:w-64 font-bold">{t(info.label)}:</div>
            <div className="max-w-xl">{info.render ? info.render(info.value) : info.value}</div>
          </div>
        ) : null))}
      </div>
    );
  };

  const getHeader = () => {
    const sanctionBlock = config.find((item) => item.id === asyncBlocks.SANCTION);
    const criminalBlock = config.find((item) => item.id === pepBlocks.CRIMINAL);
    return (
      <>
        <div
          className="border border-gray-400 rounded-full px-3 py-1 mr-2 cursor-pointer text-xs"
          onClick={() => scrollToRef(mainRef)}
        >
          {pep.pep_type_display}
        </div>
        {sanctionBlock.blockProps.data && sanctionBlock.blockProps.data.length &&
        !sanctionBlock.blockProps.data[0].noSanction ? (
          <div
            className="border border-gray-400 rounded-full px-3 py-1 cursor-pointer text-xs"
            onClick={() => scrollToRef(sanctionBlock.ref)}
          >
            {t(sanctionBlock.title)}
          </div>
          ) : null}
        {criminalBlock.blockProps.data && criminalBlock.blockProps.data.length &&
        !criminalBlock.blockProps.data[0].noCriminal ? (
          <div
            className="border border-gray-400 rounded-full px-3 py-1 ml-2 cursor-pointer text-xs"
            onClick={() => scrollToRef(criminalBlock.ref)}
          >
            {t(criminalBlock.title)}
          </div>
          ) : null}
      </>
    );
  };

  const getAdditionalInfo = () => config.sort((prev, cur) => {
    if (prev.blockProps.data && prev.blockProps.data.length && !(cur.blockProps.data.length)) {
      return -1;
    }
    if (cur.blockProps.data.length && !(prev.blockProps.data.length)) {
      return 1;
    }
    return 0;
  }).map((block, i) => {
    const Component = block.component;
    if (block.type === ASYNCBLOCK) {
      return (
        <>
          <AsyncInformationBlock
            block={block}
            setDataForBlock={setDataForBlock}
            key={block.id}
            setOpenBlock={setOpenBlock}
            open={open}
          />
          {config[i + 1] && !config[i + 1].blockProps.data.length &&
          block.blockProps.data.length ? (
            <div className="block-gray items-center font-medium text-base">
              {t('noInformation')}
            </div>
            ) : null}
        </>
      );
    }
    return (
      <>
        <InformationBlock
          title={block.title}
          titleIcon={block.titleIcon}
          color={getColor(block.blockProps.data)}
          key={block.id}
          ref={block.ref}
          setOpenBlock={setOpenBlock}
          blockId={block.id}
          open={open}
        >
          <Component {...block.blockProps} />
        </InformationBlock>
        {config[i + 1] && !config[i + 1].blockProps.data.length &&
        block.blockProps.data.length ? (
          <div className="block-gray items-center font-medium text-lg mt-10 mb-2">
            {t('noInformation')}
          </div>
          ) : null}
      </>
    );
  });

  useTopBarHiddingEffect();

  useEffect(() => {
    dispatch(setOverflow(false));
    return () => {
      dispatch(setOverflow(true));
    };
  }, []);

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
        className="flex cursor-pointer font-bold text-l block-black my-5 mx-3"
        onClick={() => history.goBack()}
      >
        <ArrowLeft className="h-5 ml-2" />
        {t('back')}
      </button>
      <div className="flex flex-row text-base">
        <div className="flex-auto w-8/12 mr-8">
          <div className="box col-span-12 border border-gray-400 p-6" ref={mainRef}>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-auto flex-col sm:flex-row items-start justify-start mt-1">
                <PepIcon />
                <div className="ml-6">
                  <div className="text-2xl font-bold block-black capitalize">
                    {getLocaleField(pep, 'fullname')}
                  </div>
                  <div className="inline-flex mt-5 mb-6 text-base">
                    {getHeader()}
                  </div>
                  {getShortInfo()}
                </div>
              </div>
              <div className="items-end text-right">
                <div className="flex flex-row block-black h-7">
                  <Tooltip content={t('inDevelopment')}>
                    <Download className="mr-8" />
                  </Tooltip>
                  <Tooltip content={t('inDevelopment')}>
                    <Print />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          {getAdditionalInfo()}
        </div>
        <PepMenu
          config={config}
          mainBlock={
            { id: pepBlocks.MAIN_INFO, ref: mainRef, icon: MainInfo }
          }
          setOpenBlock={setOpenBlock}
        />
      </div>
    </>
  );
};

PepDetail.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default PepDetail;
