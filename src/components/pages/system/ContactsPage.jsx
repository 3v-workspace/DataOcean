import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/form-components';
import { Facebook, Linkedin, Mail, MapPin, Phone } from 'react-feather';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Form from 'components/form-components/Form';
import TextInput from 'components/form-components/TextInput';
import Api from 'api';
import Yup from 'utils/yup';
import toast from 'utils/toast';

const ContactsPage = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: Yup.object({
      text: Yup.string().required().min(5).max(500),
    }),
    onSubmit: (values, actions) => {
      Api.post('users/question/create/', values)
        .then(() => {
          actions.resetForm();
          toast('success', t('yourQuestionIsSent'));
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <>
      <h2 className="intro-y text-lg font-medium justify-between mt-5 mb-5">
        {t('contacts')}
      </h2>
      <div className="intro-y box block lg:grid grid-cols-2">
        <div className="block lg:inline-grid lg:border-r">
          <div className="mx-10 pt-6">
            <h2 className="font-medium pb-4">{t('getInTouchWithUs')}:</h2>
            <p className="items-center flex mt-2 text-gray-700">
              <MapPin className="w-4 h-4 mr-2" /> {t('addressOffice')}
            </p>
            <p className="items-center flex mt-5 text-gray-700">
              <Phone className="w-4 h-4 mr-2" />+38 063 25 88 145
            </p>
            <a className="items-center flex mt-5 text-blue-800" href="mailto:info@dataocean.us">
              <Mail className="w-4 h-4 mr-2" />info@dataocean.us
            </a>
          </div>
          <div className="mx-10 pt-6 border-gray-200">
            <span className="my-20 pt-10 font-medium">{t('followOurNews')}:</span>
            <div className="items-center mt-2">
              <Button className="w-32 mr-2 mb-2 bg-theme-35 cursor-pointer" href="https://www.linkedin.com/company/data-ocean/" target="_blank"><Linkedin className="w-4 h-4 mr-2" />Linkedin</Button>
              <Button className="w-32 mr-2 mb-2 bg-theme-32 cursor-pointer" href="https://www.facebook.com/DataOceanGroup/" target="_blank"><Facebook className="w-4 h-4 mr-2" />Facebook</Button>
            </div>
          </div>
        </div>
        <div className="block lg:inline-grid">
          <div className="mx-10 py-6">
            <h2 className="font-medium pb-4">
              {t('couldntFindTheAnswerInTheSection')} <Link to="/system/help/" className="text-theme-1">{t('help')}</Link>? {t('contactUs')}!
            </h2>
            <Form formik={formik}>
              <TextInput
                textarea
                name="text"
                type="text"
                className="h-40 intro-x border-gray-200 block focus:outline-none justify-items-start"
                placeholder={t('hiIWouldLikeToAsk')}
                size="lg"
                formik={formik}
              />
              <Button
                type="submit"
                className="px-8 mt-2"
                disabled={formik.isSubmitting}
              >
                {t('send')}
              </Button>
            </Form>
          </div>
          {/* <img alt="Map of Kyiv, UA" src="/images/map.png" /> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

/* ContactsPage.propTypes = {};  */

export default ContactsPage;
