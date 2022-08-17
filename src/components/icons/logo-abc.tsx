import React from 'react';

const LogoABC: React.FC<React.SVGAttributes<Record<string, unknown>>> = ({className, width}) => {
  return (
    <svg
      className={className}
      width={width}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 246 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4_368)">
        <path
          d="M6.31671 104.304C5.54673 104.304 4.91458 104.46 4.42027 104.771C3.92596 105.082 3.67881 105.554 3.67881 106.186C3.67881 106.818 3.92596 107.3 4.42027 107.635C4.91458 107.97 5.96499 108.328 7.5715 108.715C9.17801 109.102 10.39 109.645 11.2075 110.343C12.0203 111.041 12.429 112.07 12.429 113.428C12.429 114.787 11.911 115.891 10.8796 116.736C9.84818 117.58 8.49358 118.005 6.82053 118.005C4.36799 118.005 2.19112 117.165 0.289932 115.49L1.94872 113.508C3.53622 114.877 5.18075 115.556 6.88707 115.556C7.73785 115.556 8.41753 115.377 8.91659 115.009C9.41565 114.646 9.66756 114.164 9.66756 113.56C9.66756 112.956 9.43467 112.489 8.95937 112.159C8.48882 111.824 7.67606 111.522 6.52584 111.244C5.37562 110.97 4.50107 110.715 3.9022 110.489C3.30332 110.258 2.77099 109.961 2.30995 109.588C1.38312 108.89 0.917326 107.823 0.917326 106.38C0.917326 104.936 1.44491 103.832 2.50007 103.049C3.55523 102.27 4.85755 101.879 6.41652 101.879C7.4194 101.879 8.41278 102.044 9.4014 102.369C10.39 102.695 11.2408 103.157 11.9585 103.752L10.5469 105.733C10.0811 105.318 9.45368 104.978 8.65993 104.71C7.86618 104.441 7.08669 104.309 6.31671 104.309V104.304ZM26.8781 116.231C25.6804 117.41 24.1879 118 22.3913 118C20.5947 118 19.1022 117.41 17.9045 116.231C16.7067 115.051 16.1079 113.608 16.1079 111.9C16.1079 110.192 16.7067 108.748 17.9045 107.569C19.1022 106.389 20.5947 105.799 22.3913 105.799C24.1879 105.799 25.6804 106.389 26.8781 107.569C28.0759 108.748 28.6747 110.192 28.6747 111.9C28.6747 113.608 28.0759 115.051 26.8781 116.231ZM19.6868 114.693C20.395 115.415 21.2981 115.773 22.3913 115.773C23.4845 115.773 24.3828 115.415 25.0957 114.693C25.8039 113.971 26.1604 113.041 26.1604 111.9C26.1604 110.758 25.8039 109.824 25.0957 109.107C24.3875 108.385 23.4845 108.026 22.3913 108.026C21.2981 108.026 20.3998 108.385 19.6868 109.107C18.9739 109.829 18.6222 110.758 18.6222 111.9C18.6222 113.041 18.9787 113.976 19.6868 114.693ZM35.5808 105.884V107.979H38.7225V109.984H35.5808V117.825H33.0665V105.955C33.0665 104.677 33.4657 103.681 34.269 102.959C35.0675 102.237 36.0941 101.879 37.3442 101.879C38.5942 101.879 39.6589 102.27 40.5429 103.058L39.5115 105.063C38.9602 104.483 38.271 104.195 37.4487 104.195C36.2082 104.195 35.5856 104.761 35.5856 105.889L35.5808 105.884ZM45.3149 107.979V113.994C45.3149 114.561 45.4623 115.009 45.7617 115.344C46.0611 115.679 46.4794 115.844 47.0165 115.844C47.5536 115.844 48.0716 115.584 48.566 115.065L49.5974 116.825C48.7133 117.613 47.7389 118.005 46.6695 118.005C45.6001 118.005 44.6875 117.637 43.9318 116.901C43.1761 116.165 42.8006 115.174 42.8006 113.928V102.256H45.3149V105.974H48.4566V107.979H45.3149ZM58.7278 117.825H55.857L51.7267 105.979H54.3313L57.2924 114.933L60.2535 105.979H62.8582L65.8193 114.933L68.7804 105.979H71.385L67.2547 117.825H64.3839L61.5558 109.72L58.7278 117.825ZM76.0667 116.311C74.945 115.183 74.3841 113.697 74.3841 111.857C74.3841 110.017 74.9593 108.545 76.1095 107.446C77.2597 106.347 78.6238 105.799 80.1923 105.799C81.7608 105.799 83.0583 106.54 84.0755 108.026V105.979H86.5898V117.825H84.0755V115.886C83.5954 116.57 82.987 117.094 82.2456 117.457C81.5041 117.821 80.7626 118.005 80.0117 118.005C78.5002 118.005 77.1836 117.439 76.0619 116.311H76.0667ZM76.8985 111.956C76.8985 113.093 77.2645 114.018 77.9964 114.73C78.7284 115.443 79.5887 115.801 80.5773 115.801C81.5659 115.801 82.4024 115.443 83.0916 114.721C83.7808 113.999 84.123 113.074 84.123 111.947C84.123 110.819 83.7808 109.876 83.0916 109.121C82.4024 108.366 81.5564 107.984 80.5583 107.984C79.5601 107.984 78.6951 108.361 77.9774 109.121C77.2597 109.88 76.8985 110.824 76.8985 111.961V111.956ZM98.0302 108.314C96.7897 108.314 95.8534 108.715 95.226 109.517C94.5986 110.319 94.2849 111.395 94.2849 112.749V117.825H91.7705V105.979H94.2849V108.361C94.6889 107.621 95.2402 107.012 95.9342 106.535C96.6281 106.059 97.3648 105.814 98.1443 105.799L98.1681 108.314H98.035H98.0302ZM107.65 105.799C109.281 105.799 110.635 106.248 111.709 107.149C112.783 108.05 113.33 109.215 113.349 110.659L113.373 110.701L104.665 114.329C105.445 115.278 106.5 115.754 107.84 115.754C109.181 115.754 110.283 115.235 111.148 114.197L112.631 115.825C111.21 117.283 109.532 118.009 107.607 118.009C105.915 118.009 104.466 117.453 103.254 116.339C102.042 115.226 101.438 113.754 101.438 111.928C101.438 110.668 101.752 109.555 102.379 108.597C103.007 107.639 103.786 106.936 104.713 106.479C105.64 106.026 106.619 105.799 107.65 105.799ZM103.857 111.97C103.857 112.164 103.867 112.305 103.881 112.395L110.502 109.569C109.993 108.588 109.09 108.097 107.788 108.097C106.799 108.097 105.901 108.437 105.084 109.121C104.271 109.805 103.862 110.753 103.862 111.97H103.857ZM134.391 104.309C133.621 104.309 132.988 104.464 132.494 104.776C132 105.087 131.753 105.559 131.753 106.191C131.753 106.823 132 107.304 132.494 107.639C132.988 107.974 134.039 108.333 135.645 108.72C137.252 109.107 138.464 109.649 139.281 110.347C140.094 111.046 140.503 112.074 140.503 113.433C140.503 114.792 139.985 115.896 138.953 116.74C137.922 117.585 136.567 118.009 134.894 118.009C132.442 118.009 130.265 117.17 128.364 115.495L130.023 113.513C131.61 114.881 133.255 115.561 134.961 115.561C135.812 115.561 136.491 115.382 136.99 115.014C137.489 114.65 137.741 114.169 137.741 113.565C137.741 112.961 137.508 112.494 137.033 112.164C136.563 111.829 135.75 111.527 134.6 111.249C133.449 110.975 132.575 110.72 131.976 110.494C131.377 110.263 130.845 109.965 130.384 109.593C129.457 108.894 128.991 107.828 128.991 106.384C128.991 104.941 129.519 103.837 130.574 103.054C131.629 102.275 132.931 101.884 134.49 101.884C135.493 101.884 136.487 102.049 137.475 102.374C138.464 102.7 139.315 103.162 140.032 103.757L138.621 105.738C138.155 105.323 137.527 104.983 136.734 104.714C135.94 104.445 135.161 104.313 134.391 104.313V104.309ZM154.952 116.235C153.754 117.415 152.262 118.005 150.465 118.005C148.668 118.005 147.176 117.415 145.978 116.235C144.781 115.056 144.182 113.612 144.182 111.904C144.182 110.197 144.781 108.753 145.978 107.573C147.176 106.394 148.668 105.804 150.465 105.804C152.262 105.804 153.754 106.394 154.952 107.573C156.15 108.753 156.749 110.197 156.749 111.904C156.749 113.612 156.15 115.056 154.952 116.235ZM147.761 114.697C148.469 115.419 149.372 115.778 150.465 115.778C151.558 115.778 152.457 115.419 153.17 114.697C153.878 113.976 154.234 113.046 154.234 111.904C154.234 110.763 153.878 109.829 153.17 109.111C152.461 108.39 151.558 108.031 150.465 108.031C149.372 108.031 148.474 108.39 147.761 109.111C147.048 109.833 146.696 110.763 146.696 111.904C146.696 113.046 147.052 113.98 147.761 114.697ZM167.11 116.981C166.511 117.665 165.675 118.005 164.596 118.005C163.517 118.005 162.657 117.684 162.005 117.047C161.354 116.41 161.031 115.466 161.031 114.216V102.256H163.545V113.928C163.545 115.117 163.992 115.712 164.89 115.712C165.413 115.712 165.789 115.528 166.012 115.155L167.11 116.981ZM178.75 112.395V105.979H181.264V117.825H178.75V115.665C178.346 116.391 177.79 116.962 177.077 117.377C176.364 117.792 175.599 118 174.777 118C173.432 118 172.343 117.594 171.511 116.773C170.68 115.957 170.266 114.778 170.266 113.23V105.969H172.78V112.471C172.78 114.655 173.693 115.745 175.518 115.745C176.383 115.745 177.139 115.457 177.785 114.886C178.427 114.315 178.75 113.48 178.75 112.381V112.395ZM188.841 107.984V113.999C188.841 114.565 188.988 115.014 189.287 115.348C189.587 115.683 190.005 115.849 190.542 115.849C191.079 115.849 191.597 115.589 192.092 115.07L193.123 116.83C192.239 117.618 191.265 118.009 190.195 118.009C189.126 118.009 188.213 117.641 187.458 116.905C186.702 116.169 186.326 115.179 186.326 113.933V102.261H188.841V105.979H191.982V107.984H188.841ZM196.826 103.62C196.512 103.308 196.355 102.936 196.355 102.506C196.355 102.077 196.512 101.704 196.826 101.393C197.139 101.081 197.515 100.926 197.947 100.926C198.38 100.926 198.755 101.081 199.069 101.393C199.383 101.704 199.54 102.077 199.54 102.506C199.54 102.936 199.383 103.308 199.069 103.62C198.755 103.931 198.38 104.087 197.947 104.087C197.515 104.087 197.139 103.931 196.826 103.62ZM199.183 117.83H196.669V105.983H199.183V117.83ZM214.345 116.235C213.147 117.415 211.655 118.005 209.858 118.005C208.062 118.005 206.569 117.415 205.372 116.235C204.174 115.056 203.575 113.612 203.575 111.904C203.575 110.197 204.174 108.753 205.372 107.573C206.569 106.394 208.062 105.804 209.858 105.804C211.655 105.804 213.147 106.394 214.345 107.573C215.543 108.753 216.142 110.197 216.142 111.904C216.142 113.612 215.543 115.056 214.345 116.235ZM207.154 114.697C207.862 115.419 208.765 115.778 209.858 115.778C210.952 115.778 211.85 115.419 212.563 114.697C213.271 113.976 213.627 113.046 213.627 111.904C213.627 110.763 213.271 109.829 212.563 109.111C211.855 108.39 210.952 108.031 209.858 108.031C208.765 108.031 207.867 108.39 207.154 109.111C206.441 109.833 206.089 110.763 206.089 111.904C206.089 113.046 206.446 113.98 207.154 114.697ZM223.048 111.414V117.83H220.534V105.983H223.048V108.144C223.452 107.418 224.008 106.847 224.721 106.432C225.429 106.016 226.199 105.809 227.021 105.809C228.366 105.809 229.455 106.219 230.287 107.035C231.118 107.852 231.532 109.031 231.532 110.579V117.84H229.018V111.338C229.018 109.154 228.105 108.064 226.28 108.064C225.41 108.064 224.659 108.352 224.013 108.923C223.371 109.494 223.048 110.329 223.048 111.428V111.414ZM245.078 114.287C245.078 115.415 244.664 116.316 243.842 116.995C243.02 117.67 241.965 118.009 240.677 118.009C239.807 118.009 238.909 117.854 237.972 117.542C237.036 117.231 236.209 116.792 235.491 116.226L236.703 114.287C238.096 115.325 239.441 115.844 240.743 115.844C241.314 115.844 241.76 115.712 242.088 115.452C242.416 115.193 242.583 114.863 242.583 114.462C242.583 113.867 241.789 113.334 240.206 112.857C240.087 112.815 239.997 112.782 239.935 112.768C237.454 112.098 236.209 110.984 236.209 109.427C236.209 108.328 236.637 107.451 237.497 106.79C238.357 106.13 239.474 105.799 240.853 105.799C242.231 105.799 243.528 106.2 244.755 107.002L243.814 108.852C242.839 108.215 241.789 107.894 240.648 107.894C240.049 107.894 239.564 108.003 239.189 108.215C238.814 108.432 238.628 108.753 238.628 109.182C238.628 109.569 238.823 109.852 239.213 110.027C239.484 110.159 239.859 110.286 240.344 110.404C240.829 110.522 241.261 110.64 241.632 110.763C242.008 110.881 242.369 111.017 242.72 111.164C243.072 111.315 243.448 111.522 243.852 111.786C244.66 112.32 245.064 113.155 245.064 114.282L245.078 114.287Z"
          fill="#3D99D3"
        />
        <path
          d="M57.7582 31.0675C50.7761 33.8558 38.4278 38.0029 24.782 38.9606C21.7496 39.1729 19.7154 35.9176 21.2363 33.3038L38.9602 2.83075C41.1561 -0.943585 46.641 -0.943585 48.8369 2.83075L52.1687 8.56775L60.5577 22.9904C62.2926 25.9675 60.9712 29.7843 57.7582 31.0675Z"
          fill="#3CC7F4"
        />
        <path
          d="M82.084 76.9728H5.71308C1.32133 76.9728 -1.42114 72.2548 0.774734 68.4805L9.58676 53.3313C11.8112 49.505 16.0793 47.3065 20.5139 47.7216C40.4051 49.5805 52.7581 45.6929 67.1026 42.3291C69.5551 41.7535 72.1027 42.8386 73.3623 45.0041L87.0176 68.4805C89.2134 72.2548 86.471 76.9728 82.0792 76.9728H82.084Z"
          fill="#3D99D3"
        />
        <path
          d="M144.842 33.7568C133.882 29.7325 121.462 25.3023 101.609 24.0662C98.6101 23.8775 96.2764 21.4006 96.2764 18.4189V6.96375C96.2764 3.83577 98.8287 1.30225 101.98 1.30225H134.433C143.255 1.30225 149.899 3.57157 154.363 8.00641C157.737 11.3561 159.481 15.574 159.481 20.5467V20.7637C159.481 23.5237 158.987 26.0336 157.999 28.2935C155.803 33.2898 149.995 35.6487 144.842 33.7568Z"
          fill="#3CC7F4"
        />
        <path
          d="M163.731 56.0017V56.2188C163.731 62.8144 161.121 67.9994 156.002 71.6747C150.993 75.2461 144.129 76.9729 135.526 76.9729H101.985C98.8335 76.9729 96.2811 74.4394 96.2811 71.3114V43.787C96.2811 40.6685 98.824 38.1255 101.961 38.1255C127.285 38.1114 138.245 43.537 156.653 47.4151C160.713 48.2738 163.712 51.7745 163.731 55.8979C163.731 55.931 163.731 55.9687 163.731 56.0017Z"
          fill="#3D99D3"
        />
        <path
          d="M233.851 49.378L241.993 53.7657C246.357 56.1152 247.298 61.8947 243.947 65.5322C236.741 73.3592 226.37 78.2706 214.844 78.2706C200.633 78.2706 188.175 70.8021 181.241 59.6112C178.85 55.7567 181.816 50.8217 186.374 51.0199C190 51.1756 193.898 51.2605 198.099 51.2605C205.471 51.2605 212.629 49.9253 219.222 47.9202C224.098 46.4388 229.369 46.9625 233.851 49.3733V49.378Z"
          fill="#3D99D3"
        />
        <path
          d="M244.08 12.8942C233.561 1.35421 216.204 -3.92987 198.351 3.34045C190.837 6.39767 182.053 14.9984 178.912 22.4292C177.148 26.6045 176.088 30.7563 175.651 34.7996C175.28 38.2059 178.018 41.131 181.469 41.065C200.124 40.7111 219.07 36.2763 241.722 24.6607L241.993 24.5145C246.285 22.2074 247.355 16.4893 244.08 12.8942Z"
          fill="#3CC7F4"
        />
      </g>
      <defs>
        <clipPath id="clip0_4_368">
          <rect width="246" height="118" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default LogoABC;
