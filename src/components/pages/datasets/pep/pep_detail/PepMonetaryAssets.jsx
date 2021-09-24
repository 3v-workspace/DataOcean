import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PepMonetaryAssets = (props) => {
  const { data, pepId } = props;
  const { t } = useTranslation();

  const allAssetsTypes = data.reduce((typesObj, type) => {
    typesObj[type.type] = type.type_display;
    return typesObj;
  }, {});

  const tableData = data.reduce((total, money) => {
    const owner = money.owner.id === pepId ? 'declarant' : 'family';
    const currency = ['USD', 'UAH', 'EUR'].includes(money.currency) ? money.currency : 'other';
    money.amount = money.amount === null ? '---' : money.amount;
    const amount = !(currency === 'other') ? Number(money.amount) : `${money.amount} ${money.currency}`;
    if (total && total[money.declared_at]) {
      if (total[money.declared_at][money.type]) {
        if (total[money.declared_at][money.type][owner]) {
          if (total[money.declared_at][money.type][owner][currency]) {
            total[money.declared_at][money.type][owner][currency] += amount;
          } else {
            total[money.declared_at][money.type][owner][currency] = amount;
          }
        } else {
          total[money.declared_at][money.type][owner] = {
            [currency]: amount,
          };
        }
      } else {
        total[money.declared_at][money.type] = {
          [owner]: {
            [currency]: amount,
          },
        };
      }
    } else {
      total[money.declared_at] = {
        [money.type]: {
          [owner]: {
            [currency]: amount,
          },
        },
      };
    }
    return total;
  }, {});

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="inline-flex w-full text-center font-medium">
          <div className="w-3/6">{t('declarant')}</div>
          <div className="w-3/6">{t('family')}</div>
        </div>
        <table className="table text-center">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-medium">
              <td>{t('year')}</td>
              <td>Вид активу</td>
              <td>UAH</td>
              <td>EUR</td>
              <td>USD</td>
              <td>{t('other')}</td>
              <td>UAH</td>
              <td>EUR</td>
              <td>USD</td>
              <td>{t('other')}</td>
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
                <tr key={i} className="border-b border-gray-200">
                  <td>{year}</td>
                  <td>{allAssetsTypes[type]}</td>
                  {tableData[year][type].declarant ? (
                    <>
                      <td>{tableData[year][type].declarant.UAH ? tableData[year][type].declarant.UAH.toFixed(2) : '---'}</td>
                      <td>{tableData[year][type].declarant.EUR ? tableData[year][type].declarant.EUR.toFixed(2) : '---'}</td>
                      <td>{tableData[year][type].declarant.USD ? tableData[year][type].declarant.USD.toFixed(2) : '---'}</td>
                      <td>{tableData[year][type].declarant.other ? tableData[year][type].declarant.other : '---'}</td>
                    </>
                  ) : (
                    <>
                      <td>---</td>
                      <td>---</td>
                      <td>---</td>
                      <td>---</td>
                    </>
                  )}
                  {tableData[year][type].family ? (
                    <>
                      <td>{tableData[year][type].family.UAH ? tableData[year][type].family.UAH.toFixed(2) : '---'}</td>
                      <td>{tableData[year][type].family.EUR ? tableData[year][type].family.EUR.toFixed(2) : '---'}</td>
                      <td>{tableData[year][type].family.USD ? tableData[year][type].family.USD.toFixed(2) : '---'}</td>
                      <td>{tableData[year][type].family.other ? tableData[year][type].family.other : '---'}</td>
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
      </div>
    </>
  );
};

PepMonetaryAssets.propTypes = {
  data: PropTypes.array.isRequired,
  pepId: PropTypes.number.isRequired,
};

export default PepMonetaryAssets;
