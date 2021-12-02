import React, { useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import Api from 'api';
import { useDispatch } from 'react-redux';
import { setOverflow } from 'store/interface/actionCreators';
import { HelpCircle, ArrowLeft, Download } from 'react-feather';
import { renderDate, getLocaleField, getPDF } from 'utils';
import { ReactRouterPropTypes } from 'utils/prop-types';
import useTopBarHiddingEffect from 'hooks/useTopBarHiddingEffect';
import useScrollToEffect from 'hooks/useScrollToEffect';
import Tooltip from 'components/Tooltip';
import {
  Sanction, Criminal, Built, Car, Person, Career, Giftbox, Print, Info,
  Home, Money, Name, Wallet, MainInfo, PepIcon, SpendMoney, MonetaryAssets, IntangibleAssetsIcon,
} from 'components/blocks/index';
import { scrollToElement, sortedCareerData } from 'components/blocks/utils';
import LoadingIcon from 'components/LoadingIcon';
import {
  InformationBlock, AsyncInformationBlock, PepCriminal, PepLiability, PepMonetaryAssets,
  PepMoney, PepProperty, PepVehicle, PepCareer, PepHtml,
  PepRelatedPerson, PepRelatedCompanies, PepOtherNames, PepMenu,
  IntangibleAssets, SanctionBlock,
} from './pep_detail';
import { prepareRelatedPersonData, checkPepType } from './pep_detail/utils';
import { asyncBlocks, pepBlocks, ASYNCBLOCK, INFOBLOCK } from './pep_detail/const';

const PepDetail = ({ match, history }) => {
  const location = useLocation();
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
  const [loading, setLoading] = useState(false);
  const { id } = match.params;
  const { t } = useTranslation();
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
      title: 'sanctionsDetail',
      titleIcon: Sanction,
      component: SanctionBlock,
      blockProps: { data: data.SANCTION && data.SANCTION.length ? data.SANCTION : [{ noSanction: t('noSanction') }] },
      type: ASYNCBLOCK,
    },
    {
      id: pepBlocks.CRIMINAL,
      title: 'criminalProceedings',
      titleIcon: Criminal,
      component: PepCriminal,
      blockProps: { data: pep.criminal_proceedings ? pep.criminal_proceedings : [{ noCriminal: t('noCriminal') }] },
      type: INFOBLOCK,
    },
    {
      id: pepBlocks.RELATED_PERSONS,
      title: 'relatedPersons',
      titleIcon: Person,
      component: PepRelatedPerson,
      blockProps: { pepId: pep.id, matchProps: match, data: prepareRelatedPersonData(pep) },
      type: INFOBLOCK,
    },
    {
      id: pepBlocks.RELATED_COMPANIES,
      title: 'relatedCompanies',
      titleIcon: Built,
      component: PepRelatedCompanies,
      blockProps: { data: pep.related_companies },
      type: INFOBLOCK,
    },
    {
      id: asyncBlocks.CAREER,
      url: `pep/${id}/declaration/positions/`,
      title: 'career',
      titleIcon: Career,
      component: PepCareer,
      blockProps: { data: sortedCareerData(data.CAREER) },
      type: ASYNCBLOCK,
    },
    {
      id: asyncBlocks.INCOME,
      url: `pep/${id}/declaration/incomes/`,
      title: 'income',
      titleIcon: Wallet,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.INCOME,
        type: asyncBlocks.INCOME,
        pepId: pep.id,
        ownerField: 'recipient',
      },
    },
    {
      id: asyncBlocks.LIABILITY,
      url: `pep/${id}/declaration/liabilities/`,
      title: 'liability',
      titleIcon: Money,
      component: PepLiability,
      blockData: data.LIABILITY,
      type: ASYNCBLOCK,
      blockProps: { data: data.LIABILITY, pepId: pep.id },
    },
    {
      id: asyncBlocks.EXPENDITURE,
      url: `pep/${id}/declaration/expenditures/`,
      title: 'expenditures',
      titleIcon: SpendMoney,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.EXPENDITURE,
        type: asyncBlocks.EXPENDITURE,
        pepId: pep.id,
        ownerField: 'participant',
      },
    },
    {
      id: asyncBlocks.MONETARY_ASSETS,
      url: `pep/${id}/declaration/money/`,
      title: 'money',
      titleIcon: MonetaryAssets,
      component: PepMonetaryAssets,
      type: ASYNCBLOCK,
      blockProps: {
        data: data.MONETARY_ASSETS.filter((money) => money.amount !== null),
        pepId: pep.id,
      },
    },
    {
      id: asyncBlocks.GIFT,
      url: `pep/${id}/declaration/incomes/`,
      title: 'gift',
      titleIcon: Giftbox,
      component: PepMoney,
      type: ASYNCBLOCK,
      blockProps: {
        type: asyncBlocks.GIFT,
        pepId: pep.id,
        ownerField: 'recipient',
        data: data.GIFT,
      },
    },
    {
      id: pepBlocks.INTANGIBLE_ASSETS,
      title: 'intangibleAssets',
      titleIcon: IntangibleAssetsIcon,
      component: IntangibleAssets,
      blockProps: { data: pep.cryptocurrencies_from_last_declaration },
      type: INFOBLOCK,
    },
    {
      id: asyncBlocks.REAL_ESTATE,
      url: `pep/${id}/declaration/property_rights/`,
      title: 'realEstate',
      titleIcon: Home,
      component: PepProperty,
      type: ASYNCBLOCK,
      blockProps: { data: data.REAL_ESTATE },
    },
    {
      id: asyncBlocks.CAR,
      url: `pep/${id}/declaration/vehicle_rights/`,
      title: 'vehicles',
      titleIcon: Car,
      component: PepVehicle,
      blockProps: { data: data.CAR },
      type: ASYNCBLOCK,
    },
    {
      id: pepBlocks.OTHER_NAMES,
      title: 'otherNames',
      titleIcon: Name,
      component: PepOtherNames,
      blockProps: { data: pep.fullname_transcriptions_eng },
      type: INFOBLOCK,
    },
    {
      id: pepBlocks.ADDITIONAL_INFO,
      title: 'additionalInfo',
      titleIcon: Info,
      component: PepHtml,
      blockProps: { data: pep.info || '' },
      type: INFOBLOCK,
    },
  ];
  const getShortInfo = () => {
    const shortInfoFields = [
      { label: 'dateOfBirth', value: pep.date_of_birth, render: (value) => renderDate(value) },
      { label: 'terminationDatePep', value: pep.termination_date, render: (value) => renderDate(value) },
      { label: 'reasonOfTermination', value: pep.reason_of_termination },
      { label: 'placeOfBirth', value: pep.place_of_birth },
      { label: 'lastPosition', value: getLocaleField(pep, 'last_job_title') },
      { label: 'lastPlaceOfWork', value: getLocaleField(pep, 'last_employer') },
    ];
    return (
      <table>
        <tbody className="block-black align-top">
          <tr>
            <td className="w-40 lg:w-64 font-bold pb-3">{t('pepDetailType')}:</td>
            <td className="inline-flex max-w-xl">
              <Link
                to={{
                  pathname: '/system/help/',
                  state: { pathnumber: 16 },
                }}
              >
                {pep.pep_type_display}
              </Link>
              <Tooltip
                className="w-70 md:w-auto"
                position="right"
                content={t(checkPepType(pep.pep_type))}
              >
                <HelpCircle className="w-4 h-4 ml-2 text-blue-600" />
              </Tooltip>
            </td>
          </tr>
          {shortInfoFields.map((info) => (info.value && !(info.value === '---') ? (
            <tr key={info.label}>
              <td className="w-40 lg:w-64 font-bold pb-3">{t(info.label)}:</td>
              <td className="max-w-xl">{info.render ? info.render(info.value) : info.value}</td>
            </tr>
          ) : null))}
        </tbody>
      </table>
    );
  };

  const getHeader = () => {
    const sanctionBlock = config.find((item) => item.id === asyncBlocks.SANCTION);
    const criminalBlock = config.find((item) => item.id === pepBlocks.CRIMINAL);
    return (
      <>
        <div
          className="border border-gray-400 rounded-full px-3 py-1 mr-2 cursor-pointer text-xs"
          onClick={() => scrollToElement(pepBlocks.MAIN_INFO)}

        >
          {pep.pep_type_display}
        </div>
        {sanctionBlock.blockProps.data && sanctionBlock.blockProps.data.length &&
          !sanctionBlock.blockProps.data[0].noSanction ? (
            <div
              className="border border-gray-400 rounded-full px-3 py-1 cursor-pointer text-xs"
              onClick={() => scrollToElement(asyncBlocks.SANCTION)}
            >
              {t(sanctionBlock.title)}
            </div>
          ) : null}
        {criminalBlock.blockProps.data && criminalBlock.blockProps.data.length &&
          !criminalBlock.blockProps.data[0].noCriminal ? (
            <div
              className="border border-gray-400 rounded-full px-3 py-1 ml-2 cursor-pointer text-xs"
              onClick={() => scrollToElement(pepBlocks.CRIMINAL)}
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
        <Fragment key={block.id}>
          <AsyncInformationBlock
            block={block}
            setDataForBlock={setDataForBlock}
            setOpenBlock={setOpenBlock}
            open={open}
          />
          {config[i + 1] && !config[i + 1].blockProps.data.length &&
            block.blockProps.data.length ? (
              <div className="block-gray items-center font-medium text-base">
                {t('noInformation')}
              </div>
            ) : null}
        </Fragment>
      );
    }
    return (
      <Fragment key={block.id}>
        <InformationBlock
          block={block}
          open={open}
          setOpenBlock={setOpenBlock}
        >
          <Component {...block.blockProps} />
        </InformationBlock>
        {config[i + 1] && !config[i + 1].blockProps.data.length &&
          block.blockProps.data.length ? (
            <div className="block-gray items-center font-medium text-lg mt-10 mb-2">
              {t('noInformation')}
            </div>
          ) : null}
      </Fragment>
    );
  });

  useTopBarHiddingEffect();

  useScrollToEffect(location, data);

  useEffect(() => {
    dispatch(setOverflow(false));
    fetchData();
    return () => {
      dispatch(setOverflow(true));
    };
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
        {t('backToSearchResults')}
      </button>
      <div className="flex text-base pb-16">
        <div className="flex-grow mr-8 w-px">
          <div className="box border border-gray-400 p-6" id={pepBlocks.MAIN_INFO}>
            <div className="flex flex-col lg:flex-row">
              {loading && (
                <div
                  className="w-full h-screen bg-gray-700 bg-opacity-25 absolute flex items-center justify-center z-50 -m-6"
                >
                  <LoadingIcon icon="three-dots" className="w-16 h-16 z-50" />
                </div>
              )}
              <div className="flex flex-auto items-start justify-start mt-1">
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
              <div className="flex cursor-pointer space-x-8 h-11">
                <Tooltip
                  content={t('export.downloadPdf')}
                  className="flex background-hover-gray w-11"
                >
                  <Download
                    onClick={() => getPDF(
                      pep.id, getLocaleField(pep, 'fullname'), true, '/pep/', setLoading,
                    )}
                    className="m-auto"
                  />
                </Tooltip>
                <Tooltip
                  content={t('print')}
                  className="flex background-hover-gray w-11"
                >
                  <Print
                    onClick={() => getPDF(
                      pep.id, getLocaleField(pep, 'fullname'), false, '/pep/', setLoading,
                    )}
                    className="m-auto"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          {getAdditionalInfo()}
        </div>
        <PepMenu
          config={config}
          mainBlock={
            { id: pepBlocks.MAIN_INFO, icon: MainInfo }
          }
          setOpenBlock={setOpenBlock}
          position="left"
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
