import React, { useEffect, useState } from 'react';
import TabContent from 'components/pages/profile/TabContent';
import TabContentBlock from 'components/pages/profile/TabContentBlock';
import { ReactRouterPropTypes } from 'utils/prop-types';
import { dateFormat } from 'utils';
import { useTranslation } from 'react-i18next';
import Api, { baseApiUrl } from 'api';
import { Printer } from 'react-feather';
import Button from 'components/form-components/Button';


const InvoicesTable = (props) => {
  const { match } = props;
  const { subscriptionId } = match.params;
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState([]);
  const [subData, setSubData] = useState({});

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
  }, []);

  const getInvoiceStatus = (invoice) => {
    if (!invoice.is_paid) {
      return <span className="text-red-500 font-bold">{t('notPaid')}</span>;
    }
    return t('paid');
  };

  const openInvoice = (invoiceId) => {
    window.open(`${baseApiUrl}/api/payment/invoice/${invoiceId}/`, '_blank');
  };

  const getTitle = () => {
    if (subscriptionId && subData.subscription?.name) {
      return `${t('myPayments')}, ${t('subscription').toLowerCase()} ${subData.subscription.name}, ` +
        `${t('project').toLowerCase()} ${subData.project.name}`;
    }
    return t('myPayments');
  };

  return (
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
                <th>{t('subscription')}</th>
                <th>{t('project')}</th>
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
                  <td>{invoice.subscription_name}</td>
                  <td>{invoice.project_name}</td>
                  <td>{getInvoiceStatus(invoice)}</td>
                  <td>{invoice.paid_at ? dateFormat(invoice.paid_at) : '---'}</td>
                  <td>{invoice.price} {t('uah')}</td>
                  <td>
                    <Button
                      variant="blank"
                      className="p-1"
                      onClick={() => openInvoice(invoice.id)}
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
  );
};


InvoicesTable.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default InvoicesTable;
