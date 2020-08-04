import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fas
import { faAnkh as fasAnkh } from '@fortawesome/pro-solid-svg-icons/faAnkh'
import { faArrowAltDown as fasArrowAltDown } from '@fortawesome/pro-solid-svg-icons/faArrowAltDown'
import { faBars as fasBars } from '@fortawesome/pro-solid-svg-icons/faBars'
import { faBookmark as fasBookmark } from '@fortawesome/pro-solid-svg-icons/faBookmark'
import { faBookOpen as fasBookOpen } from '@fortawesome/pro-solid-svg-icons/faBookOpen'
import { faBoxingGlove as fasBoxingGlove } from '@fortawesome/pro-solid-svg-icons/faBoxingGlove'
import { faCaretLeft as fasCaretLeft } from '@fortawesome/pro-solid-svg-icons/faCaretLeft'
import { faCheck as fasCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'
import { faChessRook as fasChessRook } from '@fortawesome/pro-solid-svg-icons/faChessRook'
import { faClock as fasClock } from '@fortawesome/pro-solid-svg-icons/faClock'
import { faComments as fasComments } from '@fortawesome/pro-solid-svg-icons/faComments'
import { faCube as fasCube } from '@fortawesome/pro-solid-svg-icons/faCube'
import { faEnvelopeOpenDollar as fasEnvelopeOpenDollar } from '@fortawesome/pro-solid-svg-icons/faEnvelopeOpenDollar'
import { faExchange as fasExchange } from '@fortawesome/pro-solid-svg-icons/faExchange'
import { faExclamationTriangle as fasExclamationTriangle } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle'
import { faExternalLinkSquare as fasExternalLinkSquare } from '@fortawesome/pro-solid-svg-icons/faExternalLinkSquare'
import { faEye as fasEye } from '@fortawesome/pro-solid-svg-icons/faEye'
import { faFistRaised as fasFistRaised } from '@fortawesome/pro-solid-svg-icons/faFistRaised'
import { faFlowerDaffodil as fasFlowerDaffodil } from '@fortawesome/pro-solid-svg-icons/faFlowerDaffodil'
import { faFrown as fasFrown } from '@fortawesome/pro-solid-svg-icons/faFrown'
import { faHelmetBattle as fasHelmetBattle } from '@fortawesome/pro-solid-svg-icons/faHelmetBattle'
import { faLayerGroup as fasLayerGroup } from '@fortawesome/pro-solid-svg-icons/faLayerGroup'
import { faMapMarkerAlt as fasMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons/faMapMarkerAlt'
import { faPlay as fasPlay } from '@fortawesome/pro-solid-svg-icons/faPlay'
import { faPlus as fasPlus } from '@fortawesome/pro-solid-svg-icons/faPlus'
import { faQuestionCircle as fasQuestionCircle } from '@fortawesome/pro-solid-svg-icons/faQuestionCircle'
import { faShield as fasShield } from '@fortawesome/pro-solid-svg-icons/faShield'
import { faShoppingCart as fasShoppingCart } from '@fortawesome/pro-solid-svg-icons/faShoppingCart'
import { faSlidersVSquare as fasSlidersVSquare } from '@fortawesome/pro-solid-svg-icons/faSlidersVSquare'
import { faSword as fasSword } from '@fortawesome/pro-solid-svg-icons/faSword'
import { faSwords as fasSwords } from '@fortawesome/pro-solid-svg-icons/faSwords'
import { faTimes as fasTimes } from '@fortawesome/pro-solid-svg-icons/faTimes'
import { faToggleOn as fasToggleOn } from '@fortawesome/pro-solid-svg-icons/faToggleOn'
import { faToggleOff as fasToggleOff } from '@fortawesome/pro-solid-svg-icons/faToggleOff'
import { faTreasureChest as fasTreasureChest } from '@fortawesome/pro-solid-svg-icons/faTreasureChest'
import { faTrophy as fasTrophy } from '@fortawesome/pro-solid-svg-icons/faTrophy'
import { faUser as fasUser } from '@fortawesome/pro-solid-svg-icons/faUser'
import { faUsers as fasUsers } from '@fortawesome/pro-solid-svg-icons/faUsers'
import { faUserFriends as fasUserFriends } from '@fortawesome/pro-solid-svg-icons/faUserFriends'
import { faVolumeMute as fasVolumeMute } from '@fortawesome/pro-solid-svg-icons/faVolumeMute'
import { faVolumeUp as fasVolumeUp } from '@fortawesome/pro-solid-svg-icons/faVolumeUp'
import { faWalking as fasWalking } from '@fortawesome/pro-solid-svg-icons/faWalking'

// far
import { faClock as farClock } from '@fortawesome/pro-regular-svg-icons/faClock'
import { faFastForward as farFastForward } from '@fortawesome/pro-regular-svg-icons/faFastForward'
import { faSearch as farSearch } from '@fortawesome/pro-regular-svg-icons/faSearch'
import { faStepForward as farStepForward } from '@fortawesome/pro-regular-svg-icons/faStepForward'
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes'

// fal
import { faAngleDown as falAngleDown } from '@fortawesome/pro-light-svg-icons/faAngleDown'
import { faArrowAltDown as falArrowAltDown } from '@fortawesome/pro-light-svg-icons/faArrowAltDown'
import { faCaretLeft as falCaretLeft } from '@fortawesome/pro-light-svg-icons/faCaretLeft'
import { faCircle as falCircle } from '@fortawesome/pro-light-svg-icons/faCircle'
import { faExternalLink as falExternalLink } from '@fortawesome/pro-light-svg-icons/faExternalLink'
import { faHelmetBattle as falHelmetBattle } from '@fortawesome/pro-light-svg-icons/faHelmetBattle'
import { faPlayCircle as falPlayCircle } from '@fortawesome/pro-light-svg-icons/faPlayCircle'
import { faSpinner as falSpinner } from '@fortawesome/pro-light-svg-icons/faSpinner'
import { faSync as falSync } from '@fortawesome/pro-light-svg-icons/faSync'
import { faTimes as falTimes } from '@fortawesome/pro-light-svg-icons/faTimes'
import { faTriangle as falTriangle } from '@fortawesome/pro-light-svg-icons/faTriangle'

// fab
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord'
import { faEthereum } from '@fortawesome/free-brands-svg-icons/faEthereum'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faMedium } from '@fortawesome/free-brands-svg-icons/faMedium'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faTelegram} from '@fortawesome/free-brands-svg-icons/faTelegram'
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons/faFortAwesome'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(
  fasAnkh,
  fasArrowAltDown,
  fasBars,
  fasBookmark,
  fasBookOpen,
  fasBoxingGlove,
  fasCaretLeft,
  fasCheck,
  fasChessRook,
  fasClock,
  fasComments,
  fasCube,
  fasEnvelopeOpenDollar,
  fasExchange,
  fasExclamationTriangle,
  fasExternalLinkSquare,
  fasEye,
  fasFistRaised,
  fasFlowerDaffodil,
  fasFrown,
  fasHelmetBattle,
  fasLayerGroup,
  fasMapMarkerAlt,
  fasPlay,
  fasQuestionCircle,
  fasPlus,
  fasShield,
  fasShoppingCart,
  fasSlidersVSquare,
  fasSword,
  fasSwords,
  fasTimes,
  fasToggleOn,
  fasToggleOff,
  fasTrophy,
  fasTreasureChest,
  fasUser,
  fasUsers,
  fasUserFriends,
  fasVolumeMute,
  fasVolumeUp,
  fasWalking,
  farClock,
  farFastForward,
  farSearch,
  farStepForward,
  farTimes,
  falAngleDown,
  falArrowAltDown,
  falCaretLeft,
  falCircle,
  falExternalLink,
  falHelmetBattle,
  falPlayCircle,
  falSpinner,
  falSync,
  falTimes,
  falTriangle,
  faDiscord,
  faMedium,
  faEthereum,
  faGoogle,
  faTwitter,
  faTelegram,
  faFortAwesome
)

// Register the component globally
Vue.component('fa-icon', FontAwesomeIcon)
