import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import Api from 'api';
import { useTranslation } from 'react-i18next';
import {
  Bookmark, Briefcase, CreditCard,
  ShoppingBag, DollarSign,
} from 'react-feather';
import { Button } from 'components/form-components';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { YesNoModal } from 'components/modals';

const icons = [
  CreditCard,
  Briefcase,
  ShoppingBag,
];

const middleClasses = 'border-b border-t lg:border-b-0 lg:border-t-0 ' +
  'border-gray-200 p-5 lg:border-l lg:border-r border-gray-200';

const SubscriptionsPage = (props) => {
  const { history } = props;
  const { t } = useTranslation();
  const [subs, setSubs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalData, setModalData] = useState({
    subscription: {},
    project: {},
  });

  const subscriptionChoiceModalRef = useRef();

  const defaultProject = projects.find((p) => p.is_default);

  const fetchData = () => {
    Api.get('payment/subscriptions/')
      .then((resp) => {
        setSubs(resp.data);
      });
    Api.get('payment/project/')
      .then((resp) => {
        setProjects(resp.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openSubscriptionChoiceModal = (subscription) => {
    setModalData({
      subscription,
      project: defaultProject,
    });
    subscriptionChoiceModalRef.current.show();
  };

  const setSubscription = (id) => {
    Api.put(`payment/project/${defaultProject.id}/add-subscription/${id}/`)
      .then(() => {
        subscriptionChoiceModalRef.current.hide();
        $.toast('Subscription added');
        history.push(`/system/profile/projects/${defaultProject.id}/`);
      });
  };

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
      <YesNoModal
        ref={subscriptionChoiceModalRef}
        icon={DollarSign}
        header={`Обрати ${modalData.subscription.name}?`}
        message={
          `Для проекту ${modalData.project.name} буде вибраний тарифний план ${modalData.subscription.name}.`
        }
        onYes={() => setSubscription(modalData.subscription.id)}
      />
      <div className="intro-y flex flex-col lg:flex-row mt-5">
        {subs.map((sub, i) => {
          const Icon = icons[i];
          const getBoxClass = () => {
            const classes = ['subscription', 'box', 'zoom-in'];
            classes.push('py-20 h-full w-full');
            if (i !== 0 && i !== subs.length - 1) {
              classes.push(middleClasses);
            } else {
              classes.push('px-5');
            }
            if (defaultProject?.active_subscription.id === sub.id) {
              classes.push('subscription-has-project');
            }
            return classes.join(' ');
          };
          return (
            <div key={sub.id} className="hover:z-50 intro-y flex-1">
              <div className={`${getBoxClass()}`}>
                {defaultProject?.active_subscription.id === sub.id && (
                  <div className="subscription-project flex items-center font-medium">
                    <div className="px-2">
                      <Bookmark className="w-7 h-7" />
                    </div>
                    Використовується в проекті "{defaultProject.name}"
                  </div>
                )}
                <div className="h-full flex justify-between flex-col">
                  <div>
                    <Icon className="w-12 h-12 text-theme-1 mx-auto" />
                    <div className="text-xl font-medium text-center mt-10">{sub.name}</div>
                    <div className="text-gray-700 text-center mt-5">
                      {sub.price === 0 ? (
                        'Unlimited duration'
                      ) : (
                        `${sub.duration} Days`
                      )}
                      <span className="mx-1">•</span>{sub.requests_limit} Requests
                    </div>
                    <div className="text-gray-600 px-10 text-center mx-auto mt-2">
                      {sub.description}
                    </div>
                  </div>
                  <div>
                    <div className="subscription-price flex justify-center">
                      <div className="relative text-5xl font-semibold mt-8 mx-auto">
                        {sub.price}
                        <span className="absolute text-2xl top-0 right-0 text-gray-500 -mr-4 mt-1">₴</span>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      disabled={
                        sub.price === 0 || sub.id === defaultProject?.active_subscription.id
                      }
                      isRounded
                      noFlex
                      type="button"
                      className="subscription-button block mx-auto mt-8 px-8"
                      onClick={() => sub.price !== 0 && openSubscriptionChoiceModal(sub)}
                    >
                      Обрати
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

SubscriptionsPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default SubscriptionsPage;
