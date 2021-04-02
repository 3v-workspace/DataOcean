import React, { useEffect, useState, useRef } from 'react';
import TabContent from 'components/pages/profile/TabContent';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { dateFormat } from 'utils';
import { useTranslation } from 'react-i18next';
import Api, { baseApiUrl } from 'api';
import { Eye, Printer } from 'react-feather';
import Button from 'components/form-components/Button';
import { BlankModal } from 'components/modals';
import UserStatusForm from 'components/pages/profile/UserStatusForm';

const InvoicesTable = (props) => {
  const { match } = props;
  const { subscriptionId } = match.params;
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState([]);
  const [subData, setSubData] = useState({});
  const [invoiceData, setInvoiceData] = useState({});

  const customSubscriptionModalRef = useRef();

  const fetchData = () => {
    let url;
    if (subscriptionId) {
      url = `payment/subscription/${subscriptionId}/invoices/`;
      Api.get(`payment/project-subscription/${subscriptionId}/`)
        .then((resp) => {
          setSubData(resp.data);
        });
    } else {
      url = 'payment/invoices/';
    }
    Api.get(url)
      .then((resp) => {
        setInvoices(resp.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [subscriptionId]);

  const getInvoiceStatus = (invoice) => {
    if (!invoice.is_paid) {
      return <span className="text-red-500 font-bold">{t('notPaid')}</span>;
    }
    return t('paid');
  };

  const openInvoice = (invoice) => {
    window.open(`${baseApiUrl}/api/payment/invoice/${invoice.id}/${invoice.token}/`, '_blank');
  };

  const onSubmit = () => {
    customSubscriptionModalRef.current.hide();
    openInvoice(invoiceData);
  };

  const getTitle = () => {
    if (subscriptionId && subData.subscription?.name) {
      return `${t('myPayments')}, ${t('subscription').toLowerCase()} ${subData.subscription.name}, ` +
        `${t('project').toLowerCase()} ${subData.project.name}`;
    }
    return t('myPayments');
  };

  return (
    <>
      <BlankModal
        ref={customSubscriptionModalRef}
        headerText={t('confirmationInvoice')}
      >
        <div className="p-5">
          <UserStatusForm onSubmit={onSubmit} />
        </div>
      </BlankModal>
      <TabContent>
        <TabContentBlock
          large
          title={getTitle()}
        >
          <div className="overflow-auto md:overflow-hidden">
            <table className="table">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th>{t('invoiceNo')}</th>
                  {!subscriptionId && [
                    <th key={1}>{t('subscription')}</th>,
                    <th key={2}>{t('project')}</th>,
                  ]}
                  <th>{t('status')}</th>
                  <th>{t('paymentDate')}</th>
                  <th>{t('paymentAmount')}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b intro-x"
                  >
                    <td>{invoice.id}</td>
                    {!subscriptionId && [
                      <td key={1}>{invoice.subscription_name}</td>,
                      <td key={2}>{invoice.project_name}</td>,
                    ]}
                    <td>{getInvoiceStatus(invoice)}</td>
                    <td>{invoice.paid_at ? dateFormat(invoice.paid_at) : '---'}</td>
                    <td>{invoice.price} {t('uah')}</td>
                    <td>
                      <Button
                        variant="blank"
                        className="p-1 text-theme-3"
                        onClick={() => {
                          customSubscriptionModalRef.current.show();
                          setInvoiceData(invoice);
                        }}
                      >

                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="blank"
                        className="p-1 text-theme-3"
                        onClick={() => openInvoice(invoice)}
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabContentBlock>
      </TabContent>
    </>
  );
};


InvoicesTable.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default InvoicesTable;
