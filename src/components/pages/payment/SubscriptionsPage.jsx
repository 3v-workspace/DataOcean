import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import Api, { passErrorsToFormik } from 'api';
import { useTranslation } from 'react-i18next';
import {
  Bookmark, Briefcase, CreditCard,
  DollarSign, Tag, Edit,
} from 'react-feather';
import { Form, Button, TextInput } from 'components/form-components';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { YesNoModal, BlankModal } from 'components/modals';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import toast from 'utils/toast';

const icons = [
  Tag,
  CreditCard,
  Briefcase,
  // ShoppingBag,
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
  const customSubscriptionModalRef = useRef();

  const defaultProject = projects.find((p) => p.is_default);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      note: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required().min(2),
      last_name: Yup.string().required().min(2),
      email: Yup.string().required().email(),
      phone: Yup.string().max(15),
      note: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      Api.post('payment/custom-subscription-request/create/', values)
        .then(() => {
          // TODO: new toast here
          $.toast({
            heading: t('success'),
            text: t('yourRequestHasBeenSentWeWillContactYou'),
            hideAfter: false,
            icon: 'success',
          });
          customSubscriptionModalRef.current.hide();
        })
        .catch((error) => {
          passErrorsToFormik(error, formik);
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

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

  useEffect(() => {
    if (subs.length && projects.length) {
      const subId = +window.localStorage.getItem('subscription');
      window.localStorage.removeItem('subscription');
      if (subId && subId !== defaultProject?.active_subscription.subscription_id) {
        const subscription = subs.find((s) => s.id === subId);
        if (subscription) {
          openSubscriptionChoiceModal(subscription);
        }
      }
    }
  }, [subs, projects]);

  const setSubscription = (id) => {
    Api.put(`payment/project/${defaultProject.id}/add-subscription/${id}/`)
      .then(() => {
        subscriptionChoiceModalRef.current.hide();
        toast('success', t('subscriptionAdded'));
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
      <BlankModal
        ref={customSubscriptionModalRef}
        headerText={t('customSubscriptionRequest')}
      >
        <div className="p-5">
          <Form formik={formik}>
            <TextInput
              required
              formik={formik}
              name="first_name"
              label={t('firstName')}
            />
            <TextInput
              required
              formik={formik}
              name="last_name"
              label={t('lastName')}
            />
            <TextInput
              required
              formik={formik}
              type="email"
              name="email"
              label="Email"
            />
            <TextInput
              formik={formik}
              type="tel"
              name="phone"
              label={t('phone')}
            />
            <TextInput
              textarea
              formik={formik}
              name="note"
              label={t('note')}
            />
            <div className="flex justify-end">
              <Button
                variant="secondary"
                className="mr-4"
                onClick={() => customSubscriptionModalRef.current.hide()}
              >
                {t('cancel')}
              </Button>
              <Button
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
                type="submit"
              >
                {t('send')}
              </Button>
            </div>
          </Form>
        </div>
      </BlankModal>
      <YesNoModal
        ref={subscriptionChoiceModalRef}
        icon={DollarSign}
        header={t('payment_system.subscriptionChoiceModalHeader', { name: modalData.subscription.name || '' })}
        message={
          t('payment_system.subscriptionChoiceModalMessage', {
            subscription: modalData.subscription.name || '',
            project: modalData.project.name || '',
          })
        }
        onYes={() => setSubscription(modalData.subscription.id)}
      />
      <div className="intro-y flex flex-col lg:flex-row mt-5">
        {subs.map((sub, i) => {
          const Icon = icons[i];
          const getBoxClass = () => {
            const classes = ['subscription', 'box', 'zoom-in'];
            classes.push('py-20 h-full w-full');
            if (i !== 0) {
              classes.push(middleClasses);
            } else {
              classes.push('px-5');
            }
            if (defaultProject && (defaultProject.active_subscription.subscription_id === sub.id)) {
              classes.push('subscription-has-project');
            }
            return classes.join(' ');
          };
          return (
            <div key={sub.id} className="hover:z-50 intro-y flex-1">
              <div className={`${getBoxClass()}`}>
                {defaultProject &&
                (defaultProject.active_subscription.subscription_id === sub.id) && (
                  <div className="subscription-project flex items-center font-medium">
                    <div className="px-2">
                      <Bookmark className="w-7 h-7" />
                    </div>
                    {t('usedInProject', { project: defaultProject.name })}
                  </div>
                )}
                <div className="h-full flex justify-between flex-col">
                  <div>
                    <Icon className="w-12 h-12 text-theme-1 mx-auto" />
                    <div className="text-xl font-medium text-center mt-10">{sub.name}</div>
                    <div className="text-gray-700 text-center mt-5">
                      {!sub.is_default ? (
                        `${t('unlimitedViews')}`
                      ) : (
                        `${sub.platform_requests_limit} ${t('views')}`
                      )}
                      <span className="mx-1">•</span>
                      {sub.requests_limit} {t('apiRequestsTariffs')}
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
                      disabled={sub.id === defaultProject?.active_subscription.subscription_id}
                      isRounded
                      noFlex
                      type="button"
                      className="subscription-button block mx-auto mt-8 px-8"
                      onClick={() => openSubscriptionChoiceModal(sub)}
                    >
                      {t('choose')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="hover:z-50 intro-y flex-1">
          <div className="subscription box zoom-in py-20 h-full w-full px-5">
            {/*<div className="subscription-project flex items-center font-medium">*/}
            {/*  <div className="px-2">*/}
            {/*    <Bookmark className="w-7 h-7" />*/}
            {/*  </div>*/}
            {/*  {t('usedInProject', { project: defaultProject.name })}*/}
            {/*</div>*/}
            <div className="h-full flex justify-between flex-col">
              <div>
                <Edit className="w-12 h-12 text-theme-1 mx-auto" />
                <div className="text-xl font-medium text-center mt-10">Custom</div>
                <div className="text-gray-700 text-center mt-5">
                  {t('requestsAndViewsTBD')}
                </div>
              </div>
              <div>
                <div className="subscription-price flex justify-center">
                  <div className="relative text-3xl font-semibold mt-5 mx-auto">
                    {t('contactSupportForPrice')}
                  </div>
                </div>
                <Button
                  size="lg"
                  isRounded
                  noFlex
                  type="button"
                  className="subscription-button block mx-auto mt-8 px-8"
                  onClick={() => customSubscriptionModalRef.current.show()}
                >
                  {t('choose')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SubscriptionsPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default SubscriptionsPage;
