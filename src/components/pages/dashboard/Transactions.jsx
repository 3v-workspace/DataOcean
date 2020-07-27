import React from 'react';
// import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Plus } from 'react-feather';

const Transactions = () => (
  <div className="col-span-12 xxl:col-span-3 xxl:border-l border-theme-5 -mb-10 pb-10">
    <div className="xxl:pl-6 grid grid-cols-12 gap-6">

      <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3 xxl:mt-8">
        <div className="intro-x flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            Transactions
          </h2>
        </div>
        <div className="mt-5">
          <div className="intro-x">
            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-13.jpg" />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium">Nicolas Cage</div>
                <div className="text-gray-600 text-xs">7 July 2022</div>
              </div>
              <div className="text-theme-9">+$88</div>
            </div>
          </div>
          <div className="intro-x">
            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium">Arnold Schwarzenegger</div>
                <div className="text-gray-600 text-xs">9 August 2022</div>
              </div>
              <div className="text-theme-6">+$47</div>
            </div>
          </div>
          <div className="intro-x">
            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium">Johnny Depp</div>
                <div className="text-gray-600 text-xs">31 August 2022</div>
              </div>
              <div className="text-theme-9">+$34</div>
            </div>
          </div>
          <div className="intro-x">
            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-1.jpg" />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium">Johnny Depp</div>
                <div className="text-gray-600 text-xs">5 November 2021</div>
              </div>
              <div className="text-theme-9">+$42</div>
            </div>
          </div>
          <div className="intro-x">
            <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium">Al Pacino</div>
                <div className="text-gray-600 text-xs">17 October 2021</div>
              </div>
              <div className="text-theme-6">+$22</div>
            </div>
          </div>
          <a
            href="#"
            className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-theme-15 text-theme-16"
          >
            View More
          </a>
        </div>
      </div>


      <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3">
        <div className="intro-x flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            Recent Activities
          </h2>
          <a href="#" className="ml-auto text-theme-1 truncate">See all</a>
        </div>
        <div className="report-timeline mt-5 relative">
          <div className="intro-x relative flex items-center mb-3">
            <div className="report-timeline__image">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-4.jpg" />
              </div>
            </div>
            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
              <div className="flex items-center">
                <div className="font-medium">John Travolta</div>
                <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
              </div>
              <div className="text-gray-600 mt-1">Has joined the team</div>
            </div>
          </div>
          <div className="intro-x relative flex items-center mb-3">
            <div className="report-timeline__image">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-7.jpg" />
              </div>
            </div>
            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
              <div className="flex items-center">
                <div className="font-medium">John Travolta</div>
                <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
              </div>
              <div className="text-gray-600">
                <div className="mt-1">Added 3 new photos</div>
                <div className="flex mt-2">
                  <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Samsung Galaxy S20 Ultra">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-md border border-white"
                      src="/images/preview-8.jpg"
                    />
                  </div>
                  <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Sony Master Series A9G">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-md border border-white"
                      src="/images/preview-12.jpg"
                    />
                  </div>
                  <div className="tooltip w-8 h-8 image-fit mr-1 zoom-in" title="Sony Master Series A9G">
                    <img
                      alt="Midone Tailwind HTML Admin Template"
                      className="rounded-md border border-white"
                      src="/images/preview-11.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-x text-gray-500 text-xs text-center my-4">12 November</div>
          <div className="intro-x relative flex items-center mb-3">
            <div className="report-timeline__image">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-11.jpg" />
              </div>
            </div>
            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
              <div className="flex items-center">
                <div className="font-medium">Leonardo DiCaprio</div>
                <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
              </div>
              <div className="text-gray-600 mt-1">
                Has changed <a className="text-theme-1" href="#">Sony A7 III</a> price and description
              </div>
            </div>
          </div>
          <div className="intro-x relative flex items-center mb-3">
            <div className="report-timeline__image">
              <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                <img alt="Midone Tailwind HTML Admin Template" src="/images/profile-14.jpg" />
              </div>
            </div>
            <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
              <div className="flex items-center">
                <div className="font-medium">Kevin Spacey</div>
                <div className="text-xs text-gray-500 ml-auto">07:00 PM</div>
              </div>
              <div className="text-gray-600 mt-1">
                Has changed <a className="text-theme-1" href="#">Apple MacBook Pro 13</a> description
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-span-12 md:col-span-6 xl:col-span-12 xxl:col-span-12 xl:col-start-1 xl:row-start-1 xxl:col-start-auto xxl:row-start-auto mt-3"
      >
        <div className="intro-x flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-auto">
            Important Notes
          </h2>
          <button
            type="button"
            data-carousel="important-notes"
            data-target="prev"
            className="slick-navigator button px-2 border border-gray-400 flex items-center text-gray-700 mr-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            data-carousel="important-notes"
            data-target="next"
            className="slick-navigator button px-2 border border-gray-400 flex items-center text-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-5 intro-x">
          <div className="slick-carousel box zoom-in" id="important-notes">
            <div className="p-5">
              <div className="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
              <div className="text-gray-500 mt-1">20 Hours ago</div>
              <div
                className="text-gray-600 text-justify mt-1"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
              <div className="font-medium flex mt-5">
                <button type="button" className="button button--sm bg-gray-200 text-gray-600">
                  View Notes
                </button>
                <button
                  type="button"
                  className="button button--sm border border-gray-300 text-gray-600 ml-auto"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="font-medium truncate">Lorem Ipsum is simply dummy text</div>
              <div className="text-gray-500 mt-1">20 Hours ago</div>
              <div className="text-gray-600 text-justify mt-1">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s.
              </div>
              <div className="font-medium flex mt-5">
                <button type="button" className="button button--sm bg-gray-200 text-gray-600">
                  View Notes
                </button>
                <button
                  type="button"
                  className="button button--sm border border-gray-300 text-gray-600 ml-auto"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="font-medium truncate">Lorem Ipsum is simply dummy text</div>
              <div className="text-gray-500 mt-1">20 Hours ago</div>
              <div className="text-gray-600 text-justify mt-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.{' '}
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
              <div className="font-medium flex mt-5">
                <button type="button" className="button button--sm bg-gray-200 text-gray-600">View Notes</button>
                <button
                  type="button"
                  className="button button--sm border border-gray-300 text-gray-600 ml-auto"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 xl:col-start-1 xl:row-start-2 xxl:col-start-auto xxl:row-start-auto mt-3"
      >
        <div className="intro-x flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">
            Schedules
          </h2>
          <a href="#" className="ml-auto text-theme-1 truncate flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add New Schedules
          </a>
        </div>
        <div className="mt-5">
          <div className="intro-x box">
            <div className="p-5">
              <div className="flex">
                <i data-feather="chevron-left" className="w-5 h-5 text-gray-600" />
                <div className="font-medium mx-auto">April</div>
                <i data-feather="chevron-right" className="w-5 h-5 text-gray-600" />
              </div>
              <div className="grid grid-cols-7 gap-4 mt-5 text-center">
                <div className="font-medium">Su</div>
                <div className="font-medium">Mo</div>
                <div className="font-medium">Tu</div>
                <div className="font-medium">We</div>
                <div className="font-medium">Th</div>
                <div className="font-medium">Fr</div>
                <div className="font-medium">Sa</div>
                <div className="py-1 rounded relative text-gray-600">29</div>
                <div className="py-1 rounded relative text-gray-600">30</div>
                <div className="py-1 rounded relative text-gray-600">31</div>
                <div className="py-1 rounded relative">1</div>
                <div className="py-1 rounded relative">2</div>
                <div className="py-1 rounded relative">3</div>
                <div className="py-1 rounded relative">4</div>
                <div className="py-1 rounded relative">5</div>
                <div className="py-1 bg-theme-18 rounded relative">6</div>
                <div className="py-1 rounded relative">7</div>
                <div className="py-1 bg-theme-1 text-white rounded relative">8</div>
                <div className="py-1 rounded relative">9</div>
                <div className="py-1 rounded relative">10</div>
                <div className="py-1 rounded relative">11</div>
                <div className="py-1 rounded relative">12</div>
                <div className="py-1 rounded relative">13</div>
                <div className="py-1 rounded relative">14</div>
                <div className="py-1 rounded relative">15</div>
                <div className="py-1 rounded relative">16</div>
                <div className="py-1 rounded relative">17</div>
                <div className="py-1 rounded relative">18</div>
                <div className="py-1 rounded relative">19</div>
                <div className="py-1 rounded relative">20</div>
                <div className="py-1 rounded relative">21</div>
                <div className="py-1 rounded relative">22</div>
                <div className="py-1 bg-theme-17 rounded relative">23</div>
                <div className="py-1 rounded relative">24</div>
                <div className="py-1 rounded relative">25</div>
                <div className="py-1 rounded relative">26</div>
                <div className="py-1 bg-theme-14 rounded relative">27</div>
                <div className="py-1 rounded relative">28</div>
                <div className="py-1 rounded relative">29</div>
                <div className="py-1 rounded relative">30</div>
                <div className="py-1 rounded relative text-gray-600">1</div>
                <div className="py-1 rounded relative text-gray-600">2</div>
                <div className="py-1 rounded relative text-gray-600">3</div>
                <div className="py-1 rounded relative text-gray-600">4</div>
                <div className="py-1 rounded relative text-gray-600">5</div>
                <div className="py-1 rounded relative text-gray-600">6</div>
                <div className="py-1 rounded relative text-gray-600">7</div>
                <div className="py-1 rounded relative text-gray-600">8</div>
                <div className="py-1 rounded relative text-gray-600">9</div>
              </div>
            </div>
            <div className="border-t border-gray-200 p-5">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-theme-11 rounded-full mr-3" />
                <span className="truncate">UI/UX Workshop</span>
                <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                <span className="font-medium xl:ml-auto">23th</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-theme-1 rounded-full mr-3" />
                <span className="truncate">VueJs Frontend Development</span>
                <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                <span className="font-medium xl:ml-auto">10th</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-theme-12 rounded-full mr-3" />
                <span className="truncate">Laravel Rest API</span>
                <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />
                <span className="font-medium xl:ml-auto">31th</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Transactions.propTypes = {};

export default Transactions;
