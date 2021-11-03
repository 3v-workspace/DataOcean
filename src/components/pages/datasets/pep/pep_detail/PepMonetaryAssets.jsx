import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { renderDate } from 'utils/dateTime';
import { otherCurrency } from './utils';

const PepMonetaryAssets = (props) => {
  const { data, pepId } = props;
  const { t, i18n } = useTranslation();
  const allAssetsTypes = data.reduce((typesObj, type) => {
    typesObj[type.type] = type.type_display;
    return typesObj;
  }, {});

  const filterData = data.filter((money) => money.amount !== null);

  const tableData = filterData.reduce((total, money) => {
    const owner = money.owner.id !== pepId ? 'family' : 'declarant';
    const amount = Number(money.amount);

    if (total && total[money.declared_at]) {
      if (total[money.declared_at][money.type]) {
        if (total[money.declared_at][money.type][owner]) {
          if (total[money.declared_at][money.type][owner][money.currency]) {
            total[money.declared_at][money.type][owner][money.currency] += amount;
          } else {
            total[money.declared_at][money.type][owner][money.currency] = amount;
          }
        } else {
          total[money.declared_at][money.type][owner] = {
            [money.currency]: amount,
          };
        }
      } else {
        total[money.declared_at][money.type] = {
          [owner]: {
            [money.currency]: amount,
          },
        };
      }
    } else {
      total[money.declared_at] = {
        [money.type]: {
          [owner]: {
            [money.currency]: amount,
          },
        },
      };
    }
    return total;
  }, {});

  return (
    <>
      <table className="table text-center rounded-md border-none" style={{ boxShadow: '0 0 0 1px #dedede' }}>
        <thead className="bg-gray-200 text-gray-700 font-medium">
          <tr className="border-b border-gray-400 rounded-md">
            <td rowSpan="2">{t('year')}</td>
            <td rowSpan="2" className="border-r border-gray-400">{t('assetType')}</td>
            <th colSpan="4" className="border-r border-gray-400">{t('declarant')}</th>
            <th colSpan="4">{t('family')}</th>
          </tr>
          <tr className="border-b border-r border-gray-400">
            <th>UAH</th>
            <th>EUR</th>
            <th>USD</th>
            <th className="border-r border-gray-400">{t('other')}</th>
            <th>UAH</th>
            <th>EUR</th>
            <th>USD</th>
            <th>{t('other')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tableData).sort((prev, cur) => {
            if (prev[0] > cur[0]) {
              return -1;
            }
            if (prev[0] > cur[0]) {
              return 1;
            }
            return 0;
          }).map(([year, types]) => (
            Object.entries(types).map(([type, owners], i) => (
              <tr key={i} className="border-b border-r border-gray-400">
                <td>{renderDate(year)}</td>
                <td className="text-left border-r border-gray-400">{allAssetsTypes[type]}</td>
                {tableData[year][type].declarant ? (
                  <>
                    <td>{tableData[year][type].declarant.UAH?.toLocaleString(i18n.language) || '---'}</td>
                    <td>{tableData[year][type].declarant.EUR?.toLocaleString(i18n.language) || '---'}</td>
                    <td>{tableData[year][type].declarant.USD?.toLocaleString(i18n.language) || '---'}</td>
                    <td className="border-r border-gray-400">
                      {tableData[year][type].declarant &&
                      otherCurrency(tableData[year][type].declarant)}
                    </td>
                  </>
                ) : (
                  <>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td className="border-r border-gray-400">---</td>
                  </>
                )}
                {tableData[year][type].family ? (
                  <>
                    <td>{tableData[year][type].family.UAH?.toLocaleString(i18n.language) || '---'}</td>
                    <td>{tableData[year][type].family.EUR?.toLocaleString(i18n.language) || '---'}</td>
                    <td>{tableData[year][type].family.USD?.toLocaleString(i18n.language) || '---'}</td>
                    <td>
                      {tableData[year][type].family && otherCurrency(tableData[year][type].family)}
                    </td>
                  </>
                ) : (
                  <>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                  </>
                )}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </>
  );
};

PepMonetaryAssets.propTypes = {
  data: PropTypes.array.isRequired,
  pepId: PropTypes.number.isRequired,
};

export default PepMonetaryAssets;
