import React, { useEffect, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import Api, { passErrorsToFormik } from 'api';
import { useTranslation } from 'react-i18next';
import { DollarSign, ArrowLeft, Check } from 'react-feather';
import { Form, Button, TextInput } from 'components/form-components';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { YesNoModal, BlankModal } from 'components/modals';
import { useFormik } from 'formik';
import Yup from 'utils/yup';
import { useSelector } from 'react-redux';
import toast from 'utils/toast';
import Tooltip from 'components/Tooltip';

// const icons = [
//   Tag,
//   CreditCard,
//   Briefcase,
//   // ShoppingBag,
// ];

// const middleClasses = 'border-b border-t lg:border-b-0 lg:border-t-0 ' +
//   'border-gray-200 p-5 lg:border-l lg:border-r border-gray-200';

const SubscriptionsPage = (props) => {
  const { history } = props;
  const { t } = useTranslation();
  const user = useSelector((store) => store.user);
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
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: '',
      note: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().name().required().min(2),
      last_name: Yup.string().name().required().min(2),
      email: Yup.string().required().email(),
      phone: Yup.string().max(15),
      note: Yup.string(),
    }),
    onSubmit: (values, actions) => {
      Api.post('payment/custom-subscription-request/create/', values)
        .then(() => {
          toast('success', t('yourRequestHasBeenSentWeWillContactYou'), '', false);
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

  const getSubscriptionButton = (sub) => (
    <Button
      // size="lg"
      variant="success"
      disabled={sub.id === defaultProject?.active_subscription.subscription_id}
      isRounded
      noFlex
      type="button"
      className="block px-6"
      onClick={() => openSubscriptionChoiceModal(sub)}
    >
      {t('choose')}
    </Button>
  );

  return (
    <div>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">
          {t('subscriptions')}
        </h2>
        {history.location.state?.fromProjects && (
          <Button onClick={() => history.goBack()} className="bg-opacity-0 text-blue-800 h-2 mt-3">
            <ArrowLeft className="w-10 h-5" />
            <span className="underline">{t('returnToTheProject')}</span>
          </Button>
        )}
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
      >
        {modalData.subscription.yearly_subscription && (
          <>
            <Button
              className="mr-2"
              data-dismiss="modal"
              variant="primary"
              onClick={() => setSubscription(modalData.subscription.id)}
            >
              {t('monthlyPayment')}
            </Button>
            <Button
              // width="w-24"
              className="px-5 text-white bg-green-btn"
              data-dismiss="modal"
              variant="blank"
              onClick={() => setSubscription(modalData.subscription.yearly_subscription)}
            >
              {t('yearlyPayment')}
            </Button>
          </>
        )}
      </YesNoModal>
      <div className="intro-y box mt-5 p-5">
        <div className="overflow-auto">
          <table className="table table-rounded text-gray-700">
            <thead>
              <tr>
                <th>
                  <div />
                </th>
                {subs.map((sub) => (
                  <th className="text-center align-middle border relative">
                    {sub.yearly_subscription && (
                      <div className="absolute top-0 left-0 bg-red-600 rounded-br-xl py-1 px-2 font-normal text-white">
                        -10%*
                      </div>
                    )}
                    <div className="text-xl whitespace-nowrap text-gray-900 mt-4">{sub.name}</div>
                    <div className="text-xl -mb-2">{sub.price}</div>
                    <div className="font-normal">{t('uah')}/{t('abbreviationMonth')}</div>
                  </th>
                ))}
                <th className="text-center align-middle">
                  <div className="flex justify-center py-3">
                    <div className="text-xl mt-4 text-gray-900">Custom</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border font-medium">{t('uiUsage')}</td>
                {subs.map((sub) => (
                  <td className="text-center align-middle border">
                    {sub.is_default ? (
                      <div className="text-xl font-medium">{sub.platform_requests_limit}</div>
                    ) : t('unlimited')}
                  </td>
                ))}
                <td rowSpan={6} className="border whitespace-nowrap text-center">
                  {t('contactSales')}
                </td>
              </tr>
              <tr>
                <td className="border font-medium">{t('apiRequestsPEPUpdatesGroupChecks')}</td>
                {subs.map((sub) => (
                  <td className="text-center align-middle border text-xl font-medium">
                    {sub.requests_limit}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-medium">
                  {t('individualPEPChecks')}
                </td>
                {subs.map((sub) => (
                  <td className="text-center align-middle border text-xl font-medium">
                    {!sub.is_default && (
                      <div className="text-xl font-medium">{sub.pep_checks_per_minute}</div>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-medium">{t('contract')}</td>
                {subs.map((sub) => (
                  <td className="text-center align-middle border">
                    {!sub.is_default && (
                      <div className="flex justify-center items-center">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-medium">{t('techSupport')}</td>
                {subs.map((sub) => (
                  <td className="text-center align-middle border">
                    {!sub.is_default && (
                      <div className="flex justify-center items-center">
                        <Check className="w-6 h-6" />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border font-medium">{t('downloadPEPDatabase')}</td>
                {subs.map((sub) => (
                  <td className="text-center align-middle border">
                    {sub.pep_db_downloading_if_yearly && t('forAnnualPayment')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-0"><i>*{t('discountIsValidForAnnualPaymentOnly')}</i></td>
                {subs.map((sub) => (
                  <td>
                    <div className="flex items-center justify-center mt-4">
                      {defaultProject?.active_subscription.subscription_id === sub.id ? (
                        <Tooltip content={t('usedInProject', { project: defaultProject.name })}>
                          {getSubscriptionButton(sub)}
                        </Tooltip>
                      ) : getSubscriptionButton(sub)}
                    </div>
                  </td>
                ))}
                <td>
                  <div className="flex items-center justify-center mt-4">
                    <Button
                      // size="lg"
                      isRounded
                      noFlex
                      variant="success"
                      type="button"
                      className="block px-6"
                      onClick={() => customSubscriptionModalRef.current.show()}
                    >
                      {t('choose')}
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/*<div className="intro-y flex justify-end mt-4 mr-4">*/}
      {/*  <h3>*{t('abbreviationMonth')} = 30 {t('days')}</h3>*/}
      {/*</div>*/}
    </div>
  );
};

SubscriptionsPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default SubscriptionsPage;
