import React, { useState, useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { isEqualArray } from 'utils';

function onClear(number) {
  console.log(number);
}

class SimpleForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmitForm() {
    console.log(this.state);
  }
}

const DatePicker2 = (props) => {
  const { name, options, onChange, value } = props;
  const { t } = useTranslation();

  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [isShowDropdown, setShowDropdown] = useState(false);
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const hideDropdown = () => {
    if (isShowDropdown) {
      setShowDropdown(false);
    }
  };

  const showDropdown = () => {
    if (!isShowDropdown) {
      setShowDropdown(true);
    }
  };

  function getYear() {
    return currentYear;
  }

  function prevPage() {
    setCurrentYear(currentYear - 20);
  }

  function nextPage() {
    setCurrentYear(currentYear + 20);
  }

  function yearChange() {
    setCurrentYear(value + 10);
  }

  function newYearValue() {
    console.log(777, value);
    if (value > 1931 && value < 2021) {
      setCurrentYear(value);
    }
  }

  return (
    <>
      <div className="search sm:inline-block">
        <input
          readOnly
          type="text"
          className="input text-gray-600 w-40"
          value={t('selected', { optionsCount: options.length })}
          onClick={showDropdown}
        />
        {isShowDropdown ? (
          <ChevronUp onClick={hideDropdown} className="search__icon cursor-pointer" />
        ) : (
          <ChevronDown onClick={showDropdown} className="search__icon cursor-pointer" />
        )}
      </div>
      <div
        className={`w-1/2 sm:w-auto mt-1 absolute max-w-3xl select-dropdown ${isShowDropdown ? 'show' : ''}`}
        onMouseLeave={hideDropdown}
      >
        <div className="select-dropdown__content">
          <ul>
            <li>
              <div
                className="py-2 flex items-center whitespace-normal cursor-pointer"
              >
                <input
                  className="inputDay"
                  type="text"
                  size="2"
                  placeholder="XX"
                  id="day"
                  name="day"
                />
                <div className="dropdown">
                  <button type="button" className="dropbtn">
                    <ChevronDown className="w-4 h-6 pl-4" />
                  </button>
                  <div className="dropdown-content">
                    <div className="header" />
                    <div className="row2">
                      <div className="column">
                        <a href="#">1</a>
                        <a href="#">8</a>
                        <a href="#">15</a>
                        <a href="#">22</a>
                        <a href="#">29</a>
                      </div>
                      <div className="column">
                        <a href="#">2</a>
                        <a href="#">9</a>
                        <a href="#">16</a>
                        <a href="#">23</a>
                        <a href="#">30</a>
                      </div>
                      <div className="column">
                        <a href="#">3</a>
                        <a href="#">10</a>
                        <a href="#">17</a>
                        <a href="#">24</a>
                        <a href="#">31</a>
                      </div>
                      <div className="column">
                        <a href="#">4</a>
                        <a href="#">11</a>
                        <a href="#">18</a>
                        <a href="#">25</a>
                      </div>
                      <div className="column">
                        <a href="#">5</a>
                        <a href="#">12</a>
                        <a href="#">19</a>
                        <a href="#">26</a>
                      </div>
                      <div className="column">
                        <a href="#">6</a>
                        <a href="#">13</a>
                        <a href="#">20</a>
                        <a href="#">27</a>
                      </div>
                      <div className="column">
                        <a href="#">7</a>
                        <a href="#">14</a>
                        <a href="#">21</a>
                        <a href="#">28</a>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  className="inputMonth"
                  type="text"
                  size="15"
                  placeholder={t('month')}
                  value={monthValue}
                  id="month"
                  name="month"
                />
                <div className="dropdown">
                  <button type="button" className="dropbtn">
                    <ChevronDown className="w-4 h-6 pr-4" />
                  </button>
                  <div className="dropdown-content">
                    <div className="header" />
                    <div className="row">
                      <div className="column2">
                        <a href="#">{t('January')}</a>
                        <a href="#">{t('April')}</a>
                        <a href="#">{t('July')}</a>
                        <a href="#">{t('October')}</a>
                      </div>
                      <div className="column2">
                        <a href="#">{t('February')}</a>
                        <a href="#">{t('May')}</a>
                        <a href="#">{t('August')}</a>
                        <a href="#">{t('November')}</a>
                      </div>
                      <div className="column2">
                        <a href="#">{t('March')}</a>
                        <a href="#">{t('June')}</a>
                        <a href="#">{t('September')}</a>
                        <a href="#">{t('December')}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  className="inputYear"
                  required
                  type="text"
                  min="1921"
                  max="2041"
                  size="4"
                  placeholder="XXXX"
                  id="year"
                  name="year"
                  value={yearValue}
                />
                <div className="dropdown">
                  <button type="button" className="dropbtn">
                    <ChevronDown className="w-4 h-6 ml-4" />
                  </button>
                  <div className="dropdown-content">
                    <div className="header" />
                    <div className="row">
                      <div className="column4">
                        <ChevronLeft onClick={prevPage} className="w-6 h-6 mt+5 " />
                      </div>
                      <div className="column3">
                        <a href="#" onClick={() => setYearValue(getYear())}>{getYear()}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 4)}>{getYear() - 4}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 8)}>{getYear() - 8}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 12)}>{getYear() - 12}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 16)}>{getYear() - 16}</a>
                      </div>
                      <div className="column3">
                        <a href="#" onClick={() => setYearValue(getYear() - 1)}>{getYear() - 1}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 5)}>{getYear() - 5}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 9)}>{getYear() - 9}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 13)}>{getYear() - 13}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 17)}>{getYear() - 17}</a>
                      </div>
                      <div className="column3">
                        <a href="#" onClick={() => setYearValue(getYear() - 2)}>{getYear() - 2}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 6)}>{getYear() - 6}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 10)}>{getYear() - 10}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 14)}>{getYear() - 14}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 18)}>{getYear() - 18}</a>
                      </div>
                      <div className="column3">
                        <a href="#" onClick={() => setYearValue(getYear() - 3)}>{getYear() - 3}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 7)}>{getYear() - 7}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 11)}>{getYear() - 11}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 15)}>{getYear() - 15}</a>
                        <a href="#" onClick={() => setYearValue(getYear() - 19)}>{getYear() - 19}</a>
                      </div>
                      <div className="column4">
                        <ChevronRight onClick={nextPage} className="w-6 h-6 mt+5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="btn-group">
                <button type="button" onClick={onClear} className="cancelButton">{t('cancel')}</button>
                <button type="submit" onClick={hideDropdown} className="okButton">OK</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

DatePicker2.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

DatePicker2.defaultProps = {
  value: undefined,
};


export default DatePicker2;
