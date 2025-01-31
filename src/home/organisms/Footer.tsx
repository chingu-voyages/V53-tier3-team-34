import { Inter, Mona_Sans, Peralta } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
const monaSans = Mona_Sans({ weight: "700", subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });
const peralta = Peralta({ weight: "400", subsets: ["latin"] });
const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black p-4 md:p-8 lg:p-16 flex flex-col gap-16">
      <div className="flex justify-between flex flex-col gap-16 lg:gap-[15rem] lg:flex-row ">
        {/* Left Section */}
        <div className="flex flex-col gap-16">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Image
              src="/assets/images/logo.svg"
              alt="Partiyo Logo"
              width={50}
              height={50}
            />
            <span
              className={`text-white text-4xl font-normal ${peralta.className}`}
            >
              Partiyo
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex align-center justify-start gap-4">
            <svg
              width="54"
              height="55"
              viewBox="0 0 54 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="Instagram"
              href="/"
            >
              <title>Instagram</title>
              <g id="mingcute:ins-fill" opacity="0.5">
                <g id="Group">
                  <path
                    id="Vector"
                    d="M28.33 52.3774L28.3052 52.3819L28.1455 52.4606L28.1005 52.4696L28.069 52.4606L27.9092 52.3819C27.8852 52.3744 27.8672 52.3781 27.8552 52.3931L27.8462 52.4156L27.808 53.3786L27.8192 53.4236L27.8417 53.4529L28.0757 53.6194L28.1095 53.6284L28.1365 53.6194L28.3705 53.4529L28.3975 53.4169L28.4065 53.3786L28.3682 52.4179C28.3622 52.3939 28.3495 52.3804 28.33 52.3774ZM28.9262 52.1231L28.897 52.1276L28.4807 52.3369L28.4582 52.3594L28.4515 52.3841L28.492 53.3516L28.5032 53.3786L28.5212 53.3944L28.9735 53.6036C29.002 53.6111 29.0237 53.6051 29.0387 53.5856L29.0477 53.5541L28.9712 52.1726C28.9637 52.1456 28.9487 52.1291 28.9262 52.1231ZM27.3175 52.1276C27.3076 52.1216 27.2957 52.1197 27.2844 52.1222C27.2731 52.1247 27.2632 52.1315 27.2567 52.1411L27.2432 52.1726L27.1667 53.5541C27.1682 53.5811 27.181 53.5991 27.205 53.6081L27.2387 53.6036L27.691 53.3944L27.7135 53.3764L27.7225 53.3516L27.7607 52.3841L27.754 52.3571L27.7315 52.3346L27.3175 52.1276Z"
                    fill="#7A7878"
                  />
                  <path
                    id="Vector_2"
                    d="M36 6.79297C38.9837 6.79297 41.8452 7.97823 43.955 10.088C46.0647 12.1978 47.25 15.0593 47.25 18.043V36.043C47.25 39.0267 46.0647 41.8881 43.955 43.9979C41.8452 46.1077 38.9837 47.293 36 47.293H18C15.0163 47.293 12.1548 46.1077 10.045 43.9979C7.93526 41.8881 6.75 39.0267 6.75 36.043V18.043C6.75 15.0593 7.93526 12.1978 10.045 10.088C12.1548 7.97823 15.0163 6.79297 18 6.79297H36ZM27 18.043C24.6131 18.043 22.3239 18.9912 20.636 20.679C18.9482 22.3668 18 24.656 18 27.043C18 29.4299 18.9482 31.7191 20.636 33.4069C22.3239 35.0948 24.6131 36.043 27 36.043C29.3869 36.043 31.6761 35.0948 33.364 33.4069C35.0518 31.7191 36 29.4299 36 27.043C36 24.656 35.0518 22.3668 33.364 20.679C31.6761 18.9912 29.3869 18.043 27 18.043ZM27 22.543C28.1935 22.543 29.3381 23.0171 30.182 23.861C31.0259 24.7049 31.5 25.8495 31.5 27.043C31.5 28.2364 31.0259 29.381 30.182 30.2249C29.3381 31.0689 28.1935 31.543 27 31.543C25.8065 31.543 24.6619 31.0689 23.818 30.2249C22.9741 29.381 22.5 28.2364 22.5 27.043C22.5 25.8495 22.9741 24.7049 23.818 23.861C24.6619 23.0171 25.8065 22.543 27 22.543ZM37.125 14.668C36.5283 14.668 35.956 14.905 35.534 15.327C35.1121 15.7489 34.875 16.3212 34.875 16.918C34.875 17.5147 35.1121 18.087 35.534 18.509C35.956 18.9309 36.5283 19.168 37.125 19.168C37.7217 19.168 38.294 18.9309 38.716 18.509C39.1379 18.087 39.375 17.5147 39.375 16.918C39.375 16.3212 39.1379 15.7489 38.716 15.327C38.294 14.905 37.7217 14.668 37.125 14.668Z"
                    fill="#7A7878"
                  />
                </g>
              </g>
            </svg>
            <svg
              width="40"
              height="42"
              viewBox="0 0 40 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="Twitter"
              href="/"
              className="self-center"
            >
              <title>Twitter</title>
              <g clipPath="url(#clip0_643_34181)">
                <path
                  d="M0.321505 0.972656H11.9111L22.225 16.0187L34.605 0.972656H38.3075L23.6352 18.0793L39.4258 41.1133H27.8428L17.0697 25.4016L3.7715 41.1133H0.0722656L15.6596 23.3444L0.321505 0.972656Z"
                  fill="#7A7878"
                />
              </g>
              <defs>
                <clipPath id="clip0_643_34181">
                  <rect
                    width="39.3536"
                    height="40.1406"
                    fill="white"
                    transform="translate(0.0732422 0.972656)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="LinkedIn"
              href="/"
            >
              <title>LinkedIn</title>
              <g opacity="0.5">
                <path
                  d="M43.2517 6.79297C44.4452 6.79297 45.5898 7.26707 46.4337 8.11099C47.2776 8.9549 47.7517 10.0995 47.7517 11.293V42.793C47.7517 43.9864 47.2776 45.131 46.4337 45.9749C45.5898 46.8189 44.4452 47.293 43.2517 47.293H11.7517C10.5582 47.293 9.41364 46.8189 8.56973 45.9749C7.72581 45.131 7.25171 43.9864 7.25171 42.793V11.293C7.25171 10.0995 7.72581 8.9549 8.56973 8.11099C9.41364 7.26707 10.5582 6.79297 11.7517 6.79297H43.2517ZM42.1267 41.668V29.743C42.1267 27.7976 41.3539 25.9319 39.9783 24.5563C38.6028 23.1808 36.7371 22.408 34.7917 22.408C32.8792 22.408 30.6517 23.578 29.5717 25.333V22.8355H23.2942V41.668H29.5717V30.5755C29.5717 28.843 30.9667 27.4255 32.6992 27.4255C33.5346 27.4255 34.3359 27.7573 34.9266 28.3481C35.5173 28.9388 35.8492 29.74 35.8492 30.5755V41.668H42.1267ZM15.9817 19.303C16.9842 19.303 17.9457 18.9047 18.6546 18.1958C19.3635 17.4869 19.7617 16.5255 19.7617 15.523C19.7617 13.4305 18.0742 11.7205 15.9817 11.7205C14.9732 11.7205 14.006 12.1211 13.2929 12.8342C12.5798 13.5473 12.1792 14.5145 12.1792 15.523C12.1792 17.6155 13.8892 19.303 15.9817 19.303ZM19.1092 41.668V22.8355H12.8767V41.668H19.1092Z"
                  fill="#7A7878"
                />
              </g>
            </svg>
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="Tiktok"
              href="/"
            >
              <title>Tiktok</title>
              <g opacity="0.5">
                <path
                  d="M27.2517 4.54297C22.8016 4.54297 18.4515 5.86257 14.7514 8.3349C11.0513 10.8072 8.1674 14.3213 6.46443 18.4326C4.76146 22.5439 4.31588 27.0679 5.18405 31.4325C6.05222 35.7971 8.19514 39.8062 11.3418 42.9529C14.4885 46.0996 18.4976 48.2425 22.8622 49.1106C27.2268 49.9788 31.7508 49.5332 35.8621 47.8303C39.9734 46.1273 43.4874 43.2434 45.9598 39.5433C48.4321 35.8432 49.7517 31.493 49.7517 27.043C49.7458 21.0774 47.3733 15.3579 43.155 11.1396C38.9368 6.92137 33.2173 4.54893 27.2517 4.54297ZM40.6145 21.8972V23.3507C40.6145 23.462 40.5923 23.5721 40.549 23.6746C40.5058 23.7771 40.4424 23.8699 40.3627 23.9475C40.283 24.0251 40.1886 24.0859 40.085 24.1264C39.9814 24.1669 39.8707 24.1862 39.7595 24.1832C37.3838 24.0154 35.1111 23.1479 33.2277 21.6902V32.3282C33.2272 33.5056 32.9921 34.671 32.5363 35.7566C32.0805 36.8421 31.4129 37.826 30.5727 38.6507C29.7256 39.497 28.7181 40.1658 27.6093 40.6178C26.5005 41.0699 25.3126 41.2961 24.1152 41.2832C21.7074 41.2797 19.3964 40.335 17.6757 38.6507C16.5808 37.5469 15.7922 36.177 15.3875 34.6759C14.9827 33.1748 14.9757 31.5941 15.3672 30.0895C15.725 28.645 16.4472 27.3175 17.4665 26.2352C18.2266 25.3062 19.1847 24.5587 20.2709 24.0476C21.357 23.5365 22.5436 23.2745 23.744 23.281H25.589V27.1127C25.5898 27.224 25.5669 27.3342 25.5217 27.4359C25.4766 27.5376 25.4103 27.6286 25.3273 27.7027C25.2443 27.7768 25.1464 27.8323 25.0402 27.8656C24.934 27.8989 24.8219 27.9092 24.7115 27.8957C23.6402 27.5739 22.4859 27.6807 21.4918 28.1934C20.4977 28.7061 19.7415 29.5848 19.3827 30.6442C19.0238 31.7036 19.0903 32.861 19.5681 33.8723C20.0459 34.8836 20.8977 35.6699 21.944 36.0655C22.5515 36.4142 23.231 36.619 23.9285 36.6662C24.4685 36.6887 25.0085 36.6212 25.5215 36.4592C26.3779 36.1703 27.1228 35.6213 27.6524 34.8889C28.1819 34.1565 28.4698 33.277 28.4757 32.3732V12.9895C28.4757 12.775 28.5607 12.5693 28.7122 12.4175C28.8636 12.2657 29.069 12.1801 29.2835 12.1795H32.4672C32.6741 12.1797 32.873 12.2591 33.0232 12.4014C33.1734 12.5436 33.2635 12.7379 33.275 12.9445C33.391 13.9372 33.7063 14.8963 34.202 15.7643C34.6976 16.6323 35.3634 17.3913 36.1595 17.9957C37.2352 18.8032 38.5128 19.2984 39.8517 19.4267C40.0523 19.4439 40.2398 19.5331 40.3796 19.6779C40.5194 19.8227 40.6021 20.0132 40.6122 20.2142L40.6145 21.8972Z"
                  fill="#7A7878"
                />
              </g>
            </svg>
            <svg
              width="54"
              height="55"
              viewBox="0 0 54 55"
              fill="none"
              aria-labelledby="Youtube"
              xmlns="http://www.w3.org/2000/svg"
              href="/"
            >
              <title>Youtube</title>
              <g opacity="0.5">
                <path
                  d="M22.4983 33.793L34.1758 27.043L22.4983 20.293V33.793ZM48.5083 16.1755C48.8008 17.233 49.0033 18.6505 49.1383 20.4505C49.2958 22.2505 49.3633 23.803 49.3633 25.153L49.4983 27.043C49.4983 31.9705 49.1383 35.593 48.5083 37.9105C47.9458 39.9355 46.6408 41.2405 44.6158 41.803C43.5583 42.0955 41.6233 42.298 38.6533 42.433C35.7283 42.5905 33.0508 42.658 30.5758 42.658L26.9983 42.793C17.5708 42.793 11.6983 42.433 9.38079 41.803C7.35579 41.2405 6.05079 39.9355 5.48829 37.9105C5.19579 36.853 4.99329 35.4355 4.85829 33.6355C4.70079 31.8355 4.63329 30.283 4.63329 28.933L4.49829 27.043C4.49829 22.1155 4.85829 18.493 5.48829 16.1755C6.05079 14.1505 7.35579 12.8455 9.38079 12.283C10.4383 11.9905 12.3733 11.788 15.3433 11.653C18.2683 11.4955 20.9458 11.428 23.4208 11.428L26.9983 11.293C36.4258 11.293 42.2983 11.653 44.6158 12.283C46.6408 12.8455 47.9458 14.1505 48.5083 16.1755Z"
                  fill="#7A7878"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Section - Navigation */}
        <div className="flex gap-12 flex-col md:flex-row">
          <div className="flex flex-row gap-12">
            {/* Company Links */}
            <div className="flex flex-col gap-6">
              <h3
                className={`text-white text-2xl font-bold ${monaSans.className}`}
              >
                Partiyo
              </h3>
              <Link
                className={`text-[#dbd8d8] text-2xl font-medium ${inter.className}`}
                href="/"
              >
                About
              </Link>
              <Link
                className={`text-[#dbd8d8] text-2xl font-medium ${inter.className}`}
                href="/"
              >
                Careers
              </Link>
            </div>

            {/* Support Links */}
            <div className="flex flex-col gap-6">
              <h3
                className={`text-white text-2xl font-bold ${monaSans.className}`}
              >
                Support
              </h3>
              <Link
                className={`text-[#dbd8d8] text-2xl font-medium ${inter.className}`}
                href="/"
              >
                Help Centre
              </Link>
            </div>
          </div>

          {/* Partner Links */}
          <div className="flex flex-col gap-6">
            <h3
              className={`text-white text-2xl font-bold ${monaSans.className}`}
            >
              Partner
            </h3>
            <Link
              className={`text-[#dbd8d8] text-2xl font-medium ${inter.className}`}
              href="/"
            >
              Venues
            </Link>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className={`text-white text-2xl font-medium ${inter.className}`}>
        Copyright 2025, The Partiyo Inc.
      </div>
    </footer>
  );
};

export default Footer;
