import React from 'react';
import { CheckSquare, ChevronLeft, FileText, MapPin, Trash2 } from 'react-feather';
// import PropTypes from 'prop-types';

const UnusedSections = () => (
  <>
    <div className="col-span-12 xl:col-span-8 mt-6">
      <div className="intro-y block sm:flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">
          Official Store
        </h2>
        <div className="sm:ml-auto mt-3 sm:mt-0 relative text-gray-700">
          <MapPin className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
          <input type="text" className="input w-full sm:w-40 box pl-10" placeholder="Filter by city" />
        </div>
      </div>
      <div className="intro-y box p-5 mt-12 sm:mt-5">
        <div>
          250 Official stores in 21 countries, click the marker to see location details.
        </div>
        <div
          className="report-maps mt-5 bg-gray-200 rounded-md"
          data-center="-6.2425342, 106.8626478"
          data-sources="/dist/json/location.json"
        />
      </div>
    </div>
    <div className="col-span-12 xl:col-span-4 mt-6">
      <div className="intro-y flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">
          Weekly Best Sellers
        </h2>
      </div>
      <div className="mt-5">
        <div className="intro-y">
          <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
              <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-13.jpg" />
            </div>
            <div className="ml-4 mr-auto">
              <div className="font-medium">Nicolas Cage</div>
              <div className="text-gray-600 text-xs">7 July 2022</div>
            </div>
            <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">137
              Sales
            </div>
          </div>
        </div>
        <div className="intro-y">
          <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
              <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
            </div>
            <div className="ml-4 mr-auto">
              <div className="font-medium">Arnold Schwarzenegger</div>
              <div className="text-gray-600 text-xs">9 August 2022</div>
            </div>
            <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">
              137 Sales
            </div>
          </div>
        </div>
        <div className="intro-y">
          <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
              <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
            </div>
            <div className="ml-4 mr-auto">
              <div className="font-medium">Johnny Depp</div>
              <div className="text-gray-600 text-xs">31 August 2022</div>
            </div>
            <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">
              137 Sales
            </div>
          </div>
        </div>
        <div className="intro-y">
          <div className="box px-4 py-4 mb-3 flex items-center zoom-in">
            <div className="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
              <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
            </div>
            <div className="ml-4 mr-auto">
              <div className="font-medium">Johnny Depp</div>
              <div className="text-gray-600 text-xs">5 November 2021</div>
            </div>
            <div className="py-1 px-2 rounded-full text-xs bg-theme-9 text-white cursor-pointer font-medium">
              137 Sales
            </div>
          </div>
        </div>
        <a
          href="#"
          className="intro-y w-full block text-center rounded-md py-4 border border-dotted border-theme-15 text-theme-16"
        >
          View More
        </a>
      </div>
    </div>
    <div className="col-span-12 grid grid-cols-12 gap-6 mt-8">
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
        <div className="mini-report-chart box p-5 zoom-in">
          <div className="flex items-center">
            <div className="w-2/4 flex-none">
              <div className="text-lg font-medium truncate">Target Sales</div>
              <div className="text-gray-600 mt-1">300 Sales</div>
            </div>
            <div className="flex-none ml-auto relative">
              <canvas id="report-donut-chart-1" width="90" height="90" />
              <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                20%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
        <div className="mini-report-chart box p-5 zoom-in">
          <div className="flex">
            <div className="text-lg font-medium truncate mr-3">Social Media</div>
            <div
              className="py-1 px-2 rounded-full text-xs bg-gray-200 text-gray-600 cursor-pointer ml-auto truncate"
            >
              320 Followers
            </div>
          </div>
          <div className="mt-4">
            <canvas className="simple-line-chart-1 -ml-1" height="60" />
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
        <div className="mini-report-chart box p-5 zoom-in">
          <div className="flex items-center">
            <div className="w-2/4 flex-none">
              <div className="text-lg font-medium truncate">New Products</div>
              <div className="text-gray-600 mt-1">1450 Products</div>
            </div>
            <div className="flex-none ml-auto relative">
              <canvas id="report-donut-chart-2" width="90" height="90" />
              <div className="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">
                45%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 xxl:col-span-3 intro-y">
        <div className="mini-report-chart box p-5 zoom-in">
          <div className="flex">
            <div className="text-lg font-medium truncate mr-3">Posted Ads</div>
            <div
              className="py-1 px-2 rounded-full text-xs bg-gray-200 text-gray-600 cursor-pointer ml-auto truncate"
            >
              180 Campaign
            </div>
          </div>
          <div className="mt-4">
            <canvas className="simple-line-chart-1 -ml-1" height="60" />
          </div>
        </div>
      </div>
    </div>
    <div className="col-span-12 mt-6">
      <div className="intro-y block sm:flex items-center h-10">
        <h2 className="text-lg font-medium truncate mr-5">
          Weekly Top Seller
        </h2>
        <div className="flex items-center sm:ml-auto mt-3 sm:mt-0">
          <button type="button" className="button box flex items-center text-gray-700">
            <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export
            to Excel
          </button>
          <button type="button" className="ml-3 button box flex items-center text-gray-700">
            <FileText className="hidden sm:block w-4 h-4 mr-2" /> Export
            to PDF
          </button>
        </div>
      </div>
      <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
        <table className="table table-report sm:mt-2">
          <thead>
            <tr>
              <th className="whitespace-no-wrap">IMAGES</th>
              <th className="whitespace-no-wrap">PRODUCT NAME</th>
              <th className="text-center whitespace-no-wrap">STOCK</th>
              <th className="text-center whitespace-no-wrap">STATUS</th>
              <th className="text-center whitespace-no-wrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr className="intro-x">
              <td className="w-40">
                <div className="flex">
                  <div className="w-10 h-10 image-fit zoom-in">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-10.jpg"
                      title="Uploaded at 7 July 2022"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-13.jpg"
                      title="Uploaded at 25 May 2022"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-9.jpg"
                      title="Uploaded at 12 June 2022"
                    />
                  </div>
                </div>
              </td>
              <td>
                <a href="#" className="font-medium whitespace-no-wrap">Samsung Galaxy S20 Ultra</a>
                <div className="text-gray-600 text-xs whitespace-no-wrap">Smartphone &amp; Tablet</div>
              </td>
              <td className="text-center">158</td>
              <td className="w-40">
                <div className="flex items-center justify-center text-theme-9">
                  <CheckSquare className="w-4 h-4 mr-2" /> Active
                </div>
              </td>
              <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                  <a className="flex items-center mr-3" href="#">
                    <CheckSquare className="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a className="flex items-center text-theme-6" href="#">
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
            <tr className="intro-x">
              <td className="w-40">
                <div className="flex">
                  <div className="w-10 h-10 image-fit zoom-in">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-4.jpg"
                      title="Uploaded at 9 August 2022"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-6.jpg"
                      title="Uploaded at 6 July 2020"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-2.jpg"
                      title="Uploaded at 6 October 2021"
                    />
                  </div>
                </div>
              </td>
              <td>
                <a href="#" className="font-medium whitespace-no-wrap">Sony Master Series A9G</a>
                <div className="text-gray-600 text-xs whitespace-no-wrap">Electronic</div>
              </td>
              <td className="text-center">50</td>
              <td className="w-40">
                <div className="flex items-center justify-center text-theme-6">
                  <CheckSquare className="w-4 h-4 mr-2" /> Inactive
                </div>
              </td>
              <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                  <a className="flex items-center mr-3" href="#">
                    <CheckSquare className="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a className="flex items-center text-theme-6" href="#">
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
            <tr className="intro-x">
              <td className="w-40">
                <div className="flex">
                  <div className="w-10 h-10 image-fit zoom-in">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-12.jpg"
                      title="Uploaded at 31 August 2022"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-14.jpg"
                      title="Uploaded at 17 May 2020"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-9.jpg"
                      title="Uploaded at 15 March 2021"
                    />
                  </div>
                </div>
              </td>
              <td>
                <a href="#" className="font-medium whitespace-no-wrap">Sony Master Series A9G</a>
                <div className="text-gray-600 text-xs whitespace-no-wrap">Electronic</div>
              </td>
              <td className="text-center">99</td>
              <td className="w-40">
                <div className="flex items-center justify-center text-theme-9">
                  <CheckSquare className="w-4 h-4 mr-2" /> Active
                </div>
              </td>
              <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                  <a className="flex items-center mr-3" href="#">
                    <CheckSquare className="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a className="flex items-center text-theme-6" href="#">
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
            <tr className="intro-x">
              <td className="w-40">
                <div className="flex">
                  <div className="w-10 h-10 image-fit zoom-in">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-15.jpg"
                      title="Uploaded at 5 November 2021"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-3.jpg"
                      title="Uploaded at 22 April 2021"
                    />
                  </div>
                  <div className="w-10 h-10 image-fit zoom-in -ml-5">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="tooltip rounded-full"
                      src="/images/preview-13.jpg"
                      title="Uploaded at 14 April 2021"
                    />
                  </div>
                </div>
              </td>
              <td>
                <a href="#" className="font-medium whitespace-no-wrap">Dell XPS 13</a>
                <div className="text-gray-600 text-xs whitespace-no-wrap">PC &amp; Laptop</div>
              </td>
              <td className="text-center">50</td>
              <td className="w-40">
                <div className="flex items-center justify-center text-theme-9">
                  <CheckSquare className="w-4 h-4 mr-2" /> Active
                </div>
              </td>
              <td className="table-report__action w-56">
                <div className="flex justify-center items-center">
                  <a className="flex items-center mr-3" href="#">
                    <CheckSquare className="w-4 h-4 mr-1" /> Edit
                  </a>
                  <a className="flex items-center text-theme-6" href="#">
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-3">
        <ul className="pagination">
          <li>
            <a className="pagination__link" href="#"> <ChevronLeft className="w-4 h-4" /> </a>
          </li>
          <li>
            <a className="pagination__link" href="#"> <ChevronLeft className="w-4 h-4" /> </a>
          </li>
          <li><a className="pagination__link" href="#">...</a></li>
          <li><a className="pagination__link" href="#">1</a></li>
          <li><a className="pagination__link pagination__link--active" href="#">2</a></li>
          <li><a className="pagination__link" href="#">3</a></li>
          <li><a className="pagination__link" href="#">...</a></li>
          <li>
            <a className="pagination__link" href="#"> <i className="w-4 h-4" data-feather="chevron-right" /> </a>
          </li>
          <li>
            <a className="pagination__link" href="#"> <i className="w-4 h-4" data-feather="chevrons-right" /> </a>
          </li>
        </ul>
        <select className="w-20 input box mt-3 sm:mt-0">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </select>
      </div>
    </div>
  </>
);

UnusedSections.propTypes = {};

export default UnusedSections;
