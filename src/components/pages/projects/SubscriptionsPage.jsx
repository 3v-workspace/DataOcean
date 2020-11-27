import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Api from 'api';
import { useTranslation } from 'react-i18next';
import { Briefcase, CreditCard, ShoppingBag } from 'react-feather';
import { Button } from 'components/form-components';

const icons = [
  CreditCard,
  Briefcase,
  ShoppingBag,
];

const middleClasses = 'intro-y border-b border-t lg:border-b-0 lg:border-t-0 ' +
  'border-gray-200 flex-1 p-5 lg:border-l lg:border-r border-gray-200 py-16';

const SubscriptionsPage = (props) => {
  const { t } = useTranslation();
  const [subs, setSubs] = useState([]);

  const fetchData = () => {
    Api.get('payment/subscriptions/')
      .then((resp) => {
        setSubs(resp.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {t('subscriptions')}
        </h2>
      </div>
      {/*<h2 className="intro-y text-lg font-medium mt-10">*/}
      {/*  {t('subscriptions')}*/}
      {/*</h2>*/}
      <div className="intro-y box flex flex-col lg:flex-row mt-5">
        {subs.map((sub, i) => {
          const Icon = icons[i];
          const boxClass = (i !== 0 && i !== subs.length - 1) ? (
            middleClasses
          ) : 'intro-y flex-1 px-5 py-16';
          return (
            <div className={boxClass}>
              <Icon className="w-12 h-12 text-theme-1 mx-auto" />
              <div className="text-xl font-medium text-center mt-10">{sub.name}</div>
              <div className="text-gray-700 text-center mt-5">
                {sub.price === 0 ? (
                  'Unlimited duration'
                ) : (
                  `${sub.duration} Days`
                )}
                <span className="mx-1">•</span>{sub.requests_limit} Requests
                <span className="mx-1">•</span>Grace period {sub.grace_period} days
              </div>
              <div className="text-gray-600 px-10 text-center mx-auto mt-2">
                {sub.description}
              </div>
              <div className="flex justify-center">
                <div className="relative text-5xl font-semibold mt-8 mx-auto">
                  {sub.price}
                  <span className="absolute text-2xl top-0 right-0 text-gray-500 -mr-4 mt-1">₴</span>
                </div>
              </div>
              <Button
                size="lg"
                isRounded
                noFlex
                type="button"
                className="block mx-auto mt-8"
              >
                Обрати
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SubscriptionsPage.propTypes = {};

export default SubscriptionsPage;
