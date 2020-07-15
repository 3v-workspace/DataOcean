import React from 'react';

const DashboardPage = () => (
  <>
    <h2 className="intro-y text-lg font-medium mt-10">
      Dashboard Page
    </h2>
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
        <div className="col-span-12 mt-8">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              General Report
            </h2>
            <a href="" className="ml-auto flex text-theme-1 dark:text-theme-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-refresh-ccw w-4 h-4 mr-3"
              >
                <polyline points="1 4 1 10 7 10" />
                <polyline points="23 20 23 14 17 14" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Reload Data
            </a>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="report-box zoom-in">
                <div className="box p-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart report-box__icon text-theme-10"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <div className="ml-auto">
                      <div className="report-box__indicator bg-theme-9 tooltip cursor-pointer tooltipstered">
                        33%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-up w-4 h-4"
                        >
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold leading-8 mt-6">4.510</div>
                  <div className="text-base text-gray-600 mt-1">Item Sales</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="report-box zoom-in">
                <div className="box p-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-credit-card report-box__icon text-theme-11"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <div className="ml-auto">
                      <div className="report-box__indicator bg-theme-6 tooltip cursor-pointer tooltipstered">
                        2%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-down w-4 h-4"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold leading-8 mt-6">3.521</div>
                  <div className="text-base text-gray-600 mt-1">New Orders</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="report-box zoom-in">
                <div className="box p-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-monitor report-box__icon text-theme-12"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <div className="ml-auto">
                      <div className="report-box__indicator bg-theme-9 tooltip cursor-pointer tooltipstered">
                        12%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-up w-4 h-4"
                        >
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold leading-8 mt-6">2.145</div>
                  <div className="text-base text-gray-600 mt-1">Total Products</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="report-box zoom-in">
                <div className="box p-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user report-box__icon text-theme-9"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <div className="ml-auto">
                      <div className="report-box__indicator bg-theme-9 tooltip cursor-pointer tooltipstered">
                        22%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-chevron-up w-4 h-4"
                        >
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold leading-8 mt-6">152.000</div>
                  <div className="text-base text-gray-600 mt-1">Unique Visitor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

// DashboardPage.propTypes = {};

export default DashboardPage;
