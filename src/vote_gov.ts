/** Structure for a single state's worth of voting information. */
export interface StateVotingInfo {
  state: string;
  name: string;
  scrapeUrl: string;
  hasRegistration: boolean;
  online?: {
    url: string;
    deadline: number;
    description?: string;
  };
  mail?: {
    url: string;
    deadline: number;
    timeframe: "postmarked" | "received";
    description?: string;
  };
  inPerson?: {
    url: string;
    deadline: number;
    description?: string;
    wrinkle?: "early-voting-deadline";
  };
  confirm?: {
    url: string;
    description?: string;
  };
  fallback?: {
    url: string;
  };
}

/** Official voter registration data scraped directly from vote.gov using a really ugly Python script. */
export const VOTE_GOV_DATA: StateVotingInfo[] = [
  {
    state: "AL",
    name: "Alabama",
    scrapeUrl: "https://vote.gov/register/al/",
    hasRegistration: true,
    online: {
      url: "https://www.alabamainteractive.org/sos/voter_registration/voterRegistrationWelcome.action?ref=countmoreus_en",
      deadline: 15,
    },
    mail: {
      url: "https://www.sos.alabama.gov/alabama-votes/voter/register-to-vote?ref=countmoreus_en",
      deadline: 15,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.alabama.gov/alabama-votes/voter/register-to-vote?ref=countmoreus_en",
      deadline: 15,
    },
    confirm: {
      url: "https://myinfo.alabamavotes.gov/VoterView/RegistrantSearch.do?ref=countmoreus_en",
    },
  },
  {
    state: "AK",
    name: "Alaska",
    scrapeUrl: "https://vote.gov/register/ak/",
    hasRegistration: true,
    online: {
      url: "https://voterregistration.alaska.gov/?ref=countmoreus_en",
      deadline: 30,
    },
    mail: {
      url: "https://www.elections.alaska.gov/Core/voterregistration.php?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.elections.alaska.gov/Core/voterregistration.php?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://myvoterinformation.alaska.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "AZ",
    name: "Arizona",
    scrapeUrl: "https://vote.gov/register/az/",
    hasRegistration: true,
    online: {
      url: "https://servicearizona.com/VoterRegistration/selectLanguage?ref=countmoreus_en",
      deadline: 29,
    },
    mail: {
      url: "https://azsos.gov/elections/voting-election/register-vote-or-update-your-current-voter-information?ref=countmoreus_en",
      deadline: 29,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://azsos.gov/elections/voting-election/register-vote-or-update-your-current-voter-information?ref=countmoreus_en",
      deadline: 29,
    },
    confirm: {
      url: "https://my.arizona.vote/WhereToVote.aspx?s=individual&?ref=countmoreus_en",
    },
  },
  {
    state: "AR",
    name: "Arkansas",
    scrapeUrl: "https://vote.gov/register/ar/",
    hasRegistration: true,
    mail: {
      url: "https://www.sos.arkansas.gov/elections/voter-information/?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.arkansas.gov/elections/voter-information/?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://www.voterview.ar-nova.org/voterview?ref=countmoreus_en",
    },
  },
  {
    state: "CA",
    name: "California",
    scrapeUrl: "https://vote.gov/register/ca/",
    hasRegistration: true,
    online: {
      url: "https://registertovote.ca.gov/?ref=countmoreus_en",
      deadline: 15,
    },
    mail: {
      url: "https://www.sos.ca.gov/elections/voting-resources/voting-california/registering-vote?ref=countmoreus_en",
      deadline: 15,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.ca.gov/elections/voting-resources/voting-california/registering-vote?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://voterstatus.sos.ca.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "CO",
    name: "Colorado",
    scrapeUrl: "https://vote.gov/register/co/",
    hasRegistration: true,
    online: {
      url: "https://www.sos.state.co.us/voter/pages/pub/olvr/verifyNewVoter.xhtml?ref=countmoreus_en",
      deadline: 8,
    },
    mail: {
      url: "https://www.coloradosos.gov/voter/pages/pub/home.xhtml?ref=countmoreus_en",
      deadline: 8,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.coloradosos.gov/voter/pages/pub/home.xhtml?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://www.sos.state.co.us/voter/pages/pub/olvr/findVoterReg.xhtml?ref=countmoreus_en",
    },
  },
  {
    state: "CT",
    name: "Connecticut",
    scrapeUrl: "https://vote.gov/register/ct/",
    hasRegistration: true,
    online: {
      url: "https://voterregistration.ct.gov/OLVR/welcome.do?ref=countmoreus_en",
      deadline: 7,
    },
    mail: {
      url: "https://portal.ct.gov/SOTS/Election-Services/Voter-Information/Voter-Fact-Sheet?ref=countmoreus_en",
      deadline: 7,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://portal.ct.gov/SOTS/Election-Services/Voter-Information/Voter-Fact-Sheet?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://portaldir.ct.gov/sots/LookUp.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "DE",
    name: "Delaware",
    scrapeUrl: "https://vote.gov/register/de/",
    hasRegistration: true,
    online: {
      url: "https://ivote.de.gov/VoterView/registrant/newregistrant?ref=countmoreus_en",
      deadline: 24,
    },
    mail: {
      url: "https://elections.delaware.gov/voter/votereg.shtml?ref=countmoreus_en",
      deadline: 24,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://elections.delaware.gov/voter/votereg.shtml?ref=countmoreus_en",
      deadline: 24,
    },
    confirm: {
      url: "https://ivote.de.gov/VoterView?ref=countmoreus_en",
    },
  },
  {
    state: "FL",
    name: "Florida",
    scrapeUrl: "https://vote.gov/register/fl/",
    hasRegistration: true,
    online: {
      url: "https://registertovoteflorida.gov/eligibilityreactive?ref=countmoreus_en",
      deadline: 29,
    },
    mail: {
      url: "https://registertovoteflorida.gov/home?ref=countmoreus_en",
      deadline: 29,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://registertovoteflorida.gov/home?ref=countmoreus_en",
      deadline: 29,
    },
    confirm: {
      url: "https://registration.elections.myflorida.com/CheckVoterStatus?ref=countmoreus_en",
    },
  },
  {
    state: "GA",
    name: "Georgia",
    scrapeUrl: "https://vote.gov/register/ga/",
    hasRegistration: true,
    online: {
      url: "https://registertovote.sos.ga.gov/GAOLVR/welcome.do#no-back-button?ref=countmoreus_en",
      deadline: 29,
    },
    mail: {
      url: "https://sos.ga.gov/elections-division-georgia-secretary-states-office?ref=countmoreus_en",
      deadline: 29,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sos.ga.gov/elections-division-georgia-secretary-states-office?ref=countmoreus_en",
      deadline: 29,
    },
    confirm: {
      url: "https://mvp.sos.ga.gov/s/?ref=countmoreus_en",
    },
  },
  {
    state: "HI",
    name: "Hawaii",
    scrapeUrl: "https://vote.gov/register/hi/",
    hasRegistration: true,
    online: {
      url: "https://olvr.hawaii.gov/?ref=countmoreus_en",
      deadline: 0,
    },
    mail: {
      url: "https://elections.hawaii.gov/voters/registration/?ref=countmoreus_en",
      deadline: 8,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://elections.hawaii.gov/voters/registration/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://olvr.hawaii.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "ID",
    name: "Idaho",
    scrapeUrl: "https://vote.gov/register/id/",
    hasRegistration: true,
    online: {
      url: "https://elections.sos.idaho.gov/ElectionLink/ElectionLink/ApplicationInstructions.aspx?ref=countmoreus_en",
      deadline: 25,
    },
    mail: {
      url: "https://idahovotes.gov/voting/?ref=countmoreus_en",
      deadline: 25,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://idahovotes.gov/voting/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://elections.sos.idaho.gov/ElectionLink/ElectionLink/VoterSearch.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "IL",
    name: "Illinois",
    scrapeUrl: "https://vote.gov/register/il/",
    hasRegistration: true,
    online: {
      url: "https://ova.elections.il.gov/?ref=countmoreus_en",
      deadline: 16,
    },
    mail: {
      url: "https://www.elections.il.gov/Default.aspx?ref=countmoreus_en",
      deadline: 28,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.elections.il.gov/Default.aspx?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://ova.elections.il.gov/RegistrationLookup.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "IN",
    name: "Indiana",
    scrapeUrl: "https://vote.gov/register/in/",
    hasRegistration: true,
    online: {
      url: "https://indianavoters.in.gov/?ref=countmoreus_en",
      deadline: 29,
    },
    mail: {
      url: "https://www.in.gov/sos/elections/2403.htm?ref=countmoreus_en",
      deadline: 29,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.in.gov/sos/elections/2403.htm?ref=countmoreus_en",
      deadline: 29,
    },
    confirm: {
      url: "https://indianavoters.in.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "IA",
    name: "Iowa",
    scrapeUrl: "https://vote.gov/register/ia/",
    hasRegistration: true,
    online: {
      url: "https://mymvd.iowadot.gov/Account/Login?ReturnUrl=%2fVoterRegistration&?ref=countmoreus_en",
      deadline: 15,
    },
    mail: {
      url: "https://sos.iowa.gov/elections/voterinformation/voterregistration.html?ref=countmoreus_en",
      deadline: 15,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sos.iowa.gov/elections/voterinformation/voterregistration.html?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://sos.iowa.gov/elections/voterreg/regtovote/search.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "KS",
    name: "Kansas",
    scrapeUrl: "https://vote.gov/register/ks/",
    hasRegistration: true,
    online: {
      url: "https://www.kdor.ks.gov/Apps/VoterReg/Default.aspx?ref=countmoreus_en",
      deadline: 21,
    },
    mail: {
      url: "https://sos.ks.gov/elections/voter-information.html?ref=countmoreus_en",
      deadline: 21,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sos.ks.gov/elections/voter-information.html?ref=countmoreus_en",
      deadline: 21,
    },
    confirm: {
      url: "https://myvoteinfo.voteks.org/voterview/?ref=countmoreus_en",
    },
  },
  {
    state: "KY",
    name: "Kentucky",
    scrapeUrl: "https://vote.gov/register/ky/",
    hasRegistration: true,
    online: {
      url: "https://vrsws.sos.ky.gov/ovrweb/?ref=countmoreus_en",
      deadline: 29,
    },
    mail: {
      url: "https://elect.ky.gov/Resources/Pages/Registration.aspx?ref=countmoreus_en",
      deadline: 29,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://elect.ky.gov/Resources/Pages/Registration.aspx?ref=countmoreus_en",
      deadline: 29,
    },
    confirm: {
      url: "https://vrsws.sos.ky.gov/VIC/?ref=countmoreus_en",
    },
  },
  {
    state: "LA",
    name: "Louisiana",
    scrapeUrl: "https://vote.gov/register/la/",
    hasRegistration: true,
    online: {
      url: "https://voterportal.sos.la.gov/VoterRegistration?ref=countmoreus_en",
      deadline: 20,
    },
    mail: {
      url: "https://www.sos.la.gov/ElectionsAndVoting/RegisterToVote/Pages/default.aspx?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.la.gov/ElectionsAndVoting/RegisterToVote/Pages/default.aspx?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://voterportal.sos.la.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "ME",
    name: "Maine",
    scrapeUrl: "https://vote.gov/register/me/",
    hasRegistration: true,
    mail: {
      url: "https://www.maine.gov/sos/cec/elec/voter-info/voterguide.html?ref=countmoreus_en",
      deadline: 21,
      timeframe: "received",
    },
    inPerson: {
      url: "https://www.maine.gov/sos/cec/elec/voter-info/voterguide.html?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://www.maine.gov/sos/cec/elec/data/index.html?ref=countmoreus_en",
    },
  },
  {
    state: "MD",
    name: "Maryland",
    scrapeUrl: "https://vote.gov/register/md/",
    hasRegistration: true,
    online: {
      url: "https://voterservices.elections.maryland.gov/OnlineVoterRegistration/InstructionsStep1?ref=countmoreus_en",
      deadline: 21,
    },
    mail: {
      url: "https://www.elections.maryland.gov/voter_registration/application.html?ref=countmoreus_en",
      deadline: 21,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.elections.maryland.gov/voter_registration/application.html?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://voterservices.elections.maryland.gov/VoterSearch?ref=countmoreus_en",
    },
  },
  {
    state: "MA",
    name: "Massachusetts",
    scrapeUrl: "https://vote.gov/register/ma/",
    hasRegistration: true,
    online: {
      url: "https://www.sec.state.ma.us/ovr/?ref=countmoreus_en",
      deadline: 10,
    },
    mail: {
      url: "https://www.sec.state.ma.us/divisions/elections/voter-resources/registering-to-vote.htm?ref=countmoreus_en",
      deadline: 10,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sec.state.ma.us/divisions/elections/voter-resources/registering-to-vote.htm?ref=countmoreus_en",
      deadline: 10,
    },
    confirm: {
      url: "https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "MI",
    name: "Michigan",
    scrapeUrl: "https://vote.gov/register/mi/",
    hasRegistration: true,
    online: {
      url: "https://mvic.sos.state.mi.us/registervoter?ref=countmoreus_en",
      deadline: 15,
    },
    mail: {
      url: "https://mvic.sos.state.mi.us/?ref=countmoreus_en",
      deadline: 15,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://mvic.sos.state.mi.us/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://mvic.sos.state.mi.us/Voter/Index?ref=countmoreus_en",
    },
  },
  {
    state: "MN",
    name: "Minnesota",
    scrapeUrl: "https://vote.gov/register/mn/",
    hasRegistration: true,
    online: {
      url: "https://mnvotes.sos.state.mn.us/VoterRegistration/VoterRegistrationMain.aspx?ref=countmoreus_en",
      deadline: 21,
    },
    mail: {
      url: "https://www.sos.state.mn.us/elections-voting/register-to-vote/?ref=countmoreus_en",
      deadline: 21,
      timeframe: "received",
    },
    inPerson: {
      url: "https://www.sos.state.mn.us/elections-voting/register-to-vote/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://mnvotes.sos.state.mn.us/VoterStatus.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "MS",
    name: "Mississippi",
    scrapeUrl: "https://vote.gov/register/ms/",
    hasRegistration: true,
    mail: {
      url: "https://www.sos.ms.gov/elections-voting/voter-registration-information?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.ms.gov/elections-voting/voter-registration-information?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://www.msegov.com/sos/voter_registration/amiregistered/Search?ref=countmoreus_en",
    },
  },
  {
    state: "MO",
    name: "Missouri",
    scrapeUrl: "https://vote.gov/register/mo/",
    hasRegistration: true,
    online: {
      url: "https://s1.sos.mo.gov/elections/voterregistration/?ref=countmoreus_en",
      deadline: 27,
    },
    mail: {
      url: "https://www.sos.mo.gov/elections/goVoteMissouri/register?ref=countmoreus_en",
      deadline: 27,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.mo.gov/elections/goVoteMissouri/register?ref=countmoreus_en",
      deadline: 27,
    },
    confirm: {
      url: "https://voteroutreach.sos.mo.gov/portal/?ref=countmoreus_en",
    },
  },
  {
    state: "MT",
    name: "Montana",
    scrapeUrl: "https://vote.gov/register/mt/",
    hasRegistration: true,
    mail: {
      url: "https://sosmt.gov/elections/vote/?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sosmt.gov/elections/vote/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://prodvoterportal.mt.gov/WhereToVote.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "NE",
    name: "Nebraska",
    scrapeUrl: "https://vote.gov/register/ne/",
    hasRegistration: true,
    online: {
      url: "https://www.nebraska.gov/apps-sos-voter-registration/?ref=countmoreus_en",
      deadline: 18,
    },
    mail: {
      url: "https://sos.nebraska.gov/elections/voter-forms?ref=countmoreus_en",
      deadline: 18,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sos.nebraska.gov/elections/voter-forms?ref=countmoreus_en",
      deadline: 11,
    },
    confirm: {
      url: "https://www.votercheck.necvr.ne.gov/voterview?ref=countmoreus_en",
    },
  },
  {
    state: "NV",
    name: "Nevada",
    scrapeUrl: "https://vote.gov/register/nv/",
    hasRegistration: true,
    online: {
      url: "https://www.nvsos.gov/SOSVoterServices/start.aspx?ref=countmoreus_en",
      deadline: 5,
    },
    mail: {
      url: "https://www.nvsos.gov/sos/elections/voters/registering-to-vote?ref=countmoreus_en",
      deadline: 28,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.nvsos.gov/sos/elections/voters/registering-to-vote?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://www.nvsos.gov/votersearch/?ref=countmoreus_en",
    },
  },
  {
    state: "NH",
    name: "New Hampshire",
    scrapeUrl: "https://vote.gov/register/nh/",
    hasRegistration: true,
    mail: {
      url: "https://www.sos.nh.gov/elections/voters/register-vote?ref=countmoreus_en",
      deadline: 13,
      timeframe: "received",
    },
    inPerson: {
      url: "https://www.sos.nh.gov/elections/voters/register-vote?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://app.sos.nh.gov/voterinformation?ref=countmoreus_en",
    },
  },
  {
    state: "NJ",
    name: "New Jersey",
    scrapeUrl: "https://vote.gov/register/nj/",
    hasRegistration: true,
    online: {
      url: "https://voter.svrs.nj.gov/register?ref=countmoreus_en",
      deadline: 21,
    },
    mail: {
      url: "https://nj.gov/state/elections/voter-registration.shtml?ref=countmoreus_en",
      deadline: 21,
      timeframe: "received",
    },
    inPerson: {
      url: "https://nj.gov/state/elections/voter-registration.shtml?ref=countmoreus_en",
      deadline: 21,
    },
    confirm: {
      url: "https://voter.svrs.nj.gov/registration-check?ref=countmoreus_en",
    },
  },
  {
    state: "NM",
    name: "New Mexico",
    scrapeUrl: "https://vote.gov/register/nm/",
    hasRegistration: true,
    online: {
      url: "https://portal.sos.state.nm.us/OVR/WebPages/InstructionsStep1.aspx?ref=countmoreus_en",
      deadline: 28,
    },
    mail: {
      url: "https://www.sos.state.nm.us/voting-and-elections/voter-information/voter-registration-information/?ref=countmoreus_en",
      deadline: 28,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.sos.state.nm.us/voting-and-elections/voter-information/voter-registration-information/?ref=countmoreus_en",
      deadline: 28,
    },
    confirm: {
      url: "https://voterportal.servis.sos.state.nm.us/WhereToVote.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "NY",
    name: "New York",
    scrapeUrl: "https://vote.gov/register/ny/",
    hasRegistration: true,
    online: {
      url: "https://dmv.ny.gov/more-info/electronic-voter-registration-application?ref=countmoreus_en",
      deadline: 25,
    },
    mail: {
      url: "https://www.elections.ny.gov/votingregister.html?ref=countmoreus_en",
      deadline: 10,
      timeframe: "received",
    },
    inPerson: {
      url: "https://www.elections.ny.gov/votingregister.html?ref=countmoreus_en",
      deadline: 25,
    },
    confirm: {
      url: "https://voterlookup.elections.ny.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "NC",
    name: "North Carolina",
    scrapeUrl: "https://vote.gov/register/nc/",
    hasRegistration: true,
    online: {
      url: "https://www.ncdot.gov/dmv/offices-services/online/Pages/voter-registration-application.aspx?ref=countmoreus_en",
      deadline: 25,
    },
    mail: {
      url: "https://www.ncsbe.gov/registering/how-register?ref=countmoreus_en",
      deadline: 25,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.ncsbe.gov/registering/how-register?ref=countmoreus_en",
      deadline: 0,
      wrinkle: "early-voting-deadline",
    },
    confirm: {
      url: "https://vt.ncsbe.gov/RegLkup/?ref=countmoreus_en",
    },
  },
  {
    state: "ND",
    name: "North Dakota",
    scrapeUrl: "https://vote.gov/register/nd/",
    hasRegistration: false,
    fallback: {
      url: "https://vip.sos.nd.gov/PortalList.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "OH",
    name: "Ohio",
    scrapeUrl: "https://vote.gov/register/oh/",
    hasRegistration: true,
    online: {
      url: "https://olvr.ohiosos.gov/?ref=countmoreus_en",
      deadline: 30,
    },
    mail: {
      url: "https://olvr.ohiosos.gov/?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://olvr.ohiosos.gov/?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://voterlookup.ohiosos.gov/voterlookup.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "OK",
    name: "Oklahoma",
    scrapeUrl: "https://vote.gov/register/ok/",
    hasRegistration: true,
    mail: {
      url: "https://oklahoma.gov/elections/voter-registration/register-to-vote.html?ref=countmoreus_en",
      deadline: 25,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://oklahoma.gov/elections/voter-registration/register-to-vote.html?ref=countmoreus_en",
      deadline: 25,
    },
    confirm: {
      url: "https://okvoterportal.okelections.us/?ref=countmoreus_en",
    },
  },
  {
    state: "OR",
    name: "Oregon",
    scrapeUrl: "https://vote.gov/register/or/",
    hasRegistration: true,
    online: {
      url: "https://secure.sos.state.or.us/orestar/vr/register.do?ref=countmoreus_en",
      deadline: 21,
    },
    mail: {
      url: "https://sos.oregon.gov/voting/Pages/registration.aspx?ref=countmoreus_en",
      deadline: 21,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sos.oregon.gov/voting/Pages/registration.aspx?ref=countmoreus_en",
      deadline: 21,
    },
    confirm: {
      url: "https://secure.sos.state.or.us/orestar/vr/showVoterSearch.do?lang=eng&source=SOS&?ref=countmoreus_en",
    },
  },
  {
    state: "PA",
    name: "Pennsylvania",
    scrapeUrl: "https://vote.gov/register/pa/",
    hasRegistration: true,
    online: {
      url: "https://www.pavoterservices.pa.gov/Pages/VoterRegistrationApplication.aspx?ref=countmoreus_en",
      deadline: 15,
    },
    mail: {
      url: "https://www.pa.gov/guides/voting-and-elections/#RegisteringtoVote?ref=countmoreus_en",
      deadline: 15,
      timeframe: "received",
    },
    inPerson: {
      url: "https://www.pa.gov/guides/voting-and-elections/#RegisteringtoVote?ref=countmoreus_en",
      deadline: 15,
    },
    confirm: {
      url: "https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "RI",
    name: "Rhode Island",
    scrapeUrl: "https://vote.gov/register/ri/",
    hasRegistration: true,
    online: {
      url: "https://vote.sos.ri.gov/Home/RegistertoVote?ref=countmoreus_en",
      deadline: 30,
    },
    mail: {
      url: "https://vote.sos.ri.gov/Voter/RegisterToVote?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://vote.sos.ri.gov/Voter/RegisterToVote?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://vote.sos.ri.gov/Home/UpdateVoterRecord?ActiveFlag=0&?ref=countmoreus_en",
    },
  },
  {
    state: "SC",
    name: "South Carolina",
    scrapeUrl: "https://vote.gov/register/sc/",
    hasRegistration: true,
    online: {
      url: "https://info.scvotes.sc.gov/eng/ovr/start.aspx?ref=countmoreus_en",
      deadline: 30,
    },
    mail: {
      url: "https://scvotes.gov/voters/register-to-vote/?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://scvotes.gov/voters/register-to-vote/?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://info.scvotes.sc.gov/eng/voterinquiry/VoterInformationRequest.aspx?PageMode=VoterInfo&?ref=countmoreus_en",
    },
  },
  {
    state: "SD",
    name: "South Dakota",
    scrapeUrl: "https://vote.gov/register/sd/",
    hasRegistration: true,
    mail: {
      url: "https://sdsos.gov/elections-voting/voting/register-to-vote/default.aspx?ref=countmoreus_en",
      deadline: 15,
      timeframe: "received",
    },
    inPerson: {
      url: "https://sdsos.gov/elections-voting/voting/register-to-vote/default.aspx?ref=countmoreus_en",
      deadline: 15,
    },
    confirm: {
      url: "https://vip.sdsos.gov/VIPLogin.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "TN",
    name: "Tennessee",
    scrapeUrl: "https://vote.gov/register/tn/",
    hasRegistration: true,
    online: {
      url: "https://ovr.govote.tn.gov/?ref=countmoreus_en",
      deadline: 30,
    },
    mail: {
      url: "https://sos.tn.gov/products/elections/register-vote?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://sos.tn.gov/products/elections/register-vote?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://tnmap.tn.gov/voterlookup/?ref=countmoreus_en",
    },
  },
  {
    state: "TX",
    name: "Texas",
    scrapeUrl: "https://vote.gov/register/tx/",
    hasRegistration: true,
    mail: {
      url: "https://www.votetexas.gov/register-to-vote/index.html?ref=countmoreus_en",
      deadline: 30,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.votetexas.gov/register-to-vote/index.html?ref=countmoreus_en",
      deadline: 30,
    },
    confirm: {
      url: "https://teamrv-mvp.sos.texas.gov/MVP/mvp.do?ref=countmoreus_en",
    },
  },
  {
    state: "UT",
    name: "Utah",
    scrapeUrl: "https://vote.gov/register/ut/",
    hasRegistration: true,
    online: {
      url: "https://secure.utah.gov/voterreg/login.html?selection=REGISTER&?ref=countmoreus_en",
      deadline: 11,
    },
    mail: {
      url: "https://voteinfo.utah.gov/?ref=countmoreus_en",
      deadline: 11,
      timeframe: "received",
    },
    inPerson: {
      url: "https://voteinfo.utah.gov/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://votesearch.utah.gov/voter-search/search/search-by-voter/voter-info?ref=countmoreus_en",
    },
  },
  {
    state: "VT",
    name: "Vermont",
    scrapeUrl: "https://vote.gov/register/vt/",
    hasRegistration: true,
    online: {
      url: "https://olvr.vermont.gov/?ref=countmoreus_en",
      deadline: 0,
    },
    mail: {
      url: "https://sos.vermont.gov/elections/voters/registration/?ref=countmoreus_en",
      deadline: 0,
      timeframe: "received",
    },
    inPerson: {
      url: "https://sos.vermont.gov/elections/voters/registration/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://mvp.vermont.gov/?ref=countmoreus_en",
    },
  },
  {
    state: "VA",
    name: "Virginia",
    scrapeUrl: "https://vote.gov/register/va/",
    hasRegistration: true,
    online: {
      url: "https://www.elections.virginia.gov/citizen-portal/?ref=countmoreus_en",
      deadline: 22,
    },
    mail: {
      url: "https://www.elections.virginia.gov/registration/how-to-register/?ref=countmoreus_en",
      deadline: 22,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://www.elections.virginia.gov/registration/how-to-register/?ref=countmoreus_en",
      deadline: 22,
    },
    confirm: {
      url: "https://www.elections.virginia.gov/registration/view-your-info/?ref=countmoreus_en",
    },
  },
  {
    state: "WA",
    name: "Washington",
    scrapeUrl: "https://vote.gov/register/wa/",
    hasRegistration: true,
    online: {
      url: "https://voter.votewa.gov/WhereToVote.aspx?ref=countmoreus_en",
      deadline: 8,
    },
    mail: {
      url: "https://www.sos.wa.gov/elections/voters/?ref=countmoreus_en",
      deadline: 8,
      timeframe: "received",
    },
    inPerson: {
      url: "https://www.sos.wa.gov/elections/voters/?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://voter.votewa.gov/WhereToVote.aspx?ref=countmoreus_en",
    },
  },
  {
    state: "WV",
    name: "West Virginia",
    scrapeUrl: "https://vote.gov/register/wv/",
    hasRegistration: true,
    online: {
      url: "https://ovr.sos.wv.gov/Register/Landing?ref=countmoreus_en",
      deadline: 21,
    },
    mail: {
      url: "https://ovr.sos.wv.gov/Register/Landing?ref=countmoreus_en",
      deadline: 21,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://ovr.sos.wv.gov/Register/Landing?ref=countmoreus_en",
      deadline: 21,
    },
    confirm: {
      url: "https://apps.sos.wv.gov/Elections/voter/amiregisteredtovote?ref=countmoreus_en",
    },
  },
  {
    state: "WI",
    name: "Wisconsin",
    scrapeUrl: "https://vote.gov/register/wi/",
    hasRegistration: true,
    online: {
      url: "https://myvote.wi.gov/en-us/RegisterToVote?ref=countmoreus_en",
      deadline: 20,
    },
    mail: {
      url: "https://elections.wi.gov/Register?ref=countmoreus_en",
      deadline: 20,
      timeframe: "postmarked",
    },
    inPerson: {
      url: "https://elections.wi.gov/Register?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://myvote.wi.gov/en-us/MyVoterInfo?ref=countmoreus_en",
    },
  },
  {
    state: "WY",
    name: "Wyoming",
    scrapeUrl: "https://vote.gov/register/wy/",
    hasRegistration: true,
    mail: {
      url: "https://sos.wyo.gov/Elections/State/RegisteringToVote.aspx?ref=countmoreus_en",
      deadline: 14,
      timeframe: "received",
    },
    inPerson: {
      url: "https://sos.wyo.gov/Elections/State/RegisteringToVote.aspx?ref=countmoreus_en",
      deadline: 0,
    },
    confirm: {
      url: "https://sos.wyo.gov/Elections/Docs/WYCountyClerks.pdf?ref=countmoreus_en",
      description:
        "Click here to view Wyoming's county clerk contact information (PDF)",
    },
  },
];

/** Return the vote.gov information for a specific state. */
export const votingInfoForSt = (st: string): StateVotingInfo => {
  const data = VOTE_GOV_DATA.find((v) => v.state === st.toUpperCase());
  if (!data) {
    throw new Error(`No voting info for state ${st}`);
  }
  return data;
};

/** Return the best website to visit for registration, if available. */
export const bestRegistrationUrl = (st: string): string | null => {
  const data = votingInfoForSt(st);
  if (!data.hasRegistration) {
    return null;
  }
  if (data.online) {
    return data.online.url;
  }
  if (data.mail) {
    return data.mail.url;
  }
  if (data.inPerson) {
    return data.inPerson.url;
  }
  if (data.fallback) {
    return data.fallback.url;
  }
  if (data.confirm) {
    return data.confirm.url;
  }
  return null;
};
