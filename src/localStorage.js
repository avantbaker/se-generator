import { savePathBeforeUnload } from './actions';

export const getState = () => JSON.parse(localStorage.getItem('state')) || undefined;

export const setState = (state, props) => {
	let toSave = {};
	props.forEach(p => toSave[p] = state[p]);
	localStorage.setItem('state', JSON.stringify(toSave));
};

export const resetState = () => {
	localStorage.setItem('state', JSON.stringify({}));
}

export const resetUUID = () => {
	localStorage.setItem('UUID', "" );
}

export const setUUID = (uuid) => {
	localStorage.setItem('UUID', uuid );
}

export const getUUID = () => {
	return localStorage.getItem('UUID') || undefined;
}

export const setLastPath = (path, store) => {
	window.onbeforeunload = function(e){
		store.dispatch(savePathBeforeUnload());
		return "Session Saved";
	}
};

export const getLastPath = (state) => {
	return state.pathBeforeUnload || "/";
}

export const reducerKeys = [
	'allSlides',
	'emailForm',
	'finderPopUpVisibility',
	'map',
	'packages',
	'proposalForm',
	'routing',
	'selectedPlace',
	'sponsors',
	'whatsThisModal',
	'pathBeforeUnload'
];

export const packages = [
	{
		packageName: "Website",
		packageDescription: "Turn unused real estate on your website into dynamic profit centers that connect sponsors with your club’s members.",
		packageIcon: "icon-website-big",
		packageImage: "images/package-image-1.jpg",
		packageImageDescription: "Website Sponsorship Package",
		billingFrequency: 'Monthly',
		additionalInfo: {},
		packageOptions: [
			{
				name: 'Banner Ad',
				selected: false,
				amount: '100',
				details: ['Page-width ad with image/logo. Hyperlinks to a designated URL.']
			},
			{
				name: 'CTA Ad',
				selected: false,
				amount: '60',
				details: ['1/3-page square ad with image/logo. Hyperlinks to a designated URL.']
			},
			{
				name: 'Sidebar Logo',
				selected: false,
				amount: '40',
				frequency: 'monthly',
				details: ['Logo only. Hyperlinks to a designated URL.']
			}
		],
		discount: {},
		revenueEst: 0
	},
	{
		packageName: "Email",
		packageDescription: "Turn your club’s emails into win-win opportunities by allowing sponsors to provide exclusive offers to your members.",
		packageIcon: "icon-email-big",
		packageImage: "images/package-image-2.jpg",
		packageImageDescription: "Email Sponsorship Package",
		billingFrequency: 'Monthly',
		additionalInfo: {},
		packageOptions: [
			{
				name: 'Banner ad',
				selected: false,
				amount: '100',
				details: [
					'Page-width ad with image/logo. Hyperlinks to a designated URL.',
					'Include a message and offer in the email text to be sent directly to our members.'
				]
			}
		],
		discount: {},
		revenueEst: 0
	},
	{
		packageName: "Registration",
		packageDescription: "Put your sponsors front and center with value-add opportunities during your club’s registration process this season.",
		packageIcon: "icon-registration",
		packageImage: "images/package-image-3.jpg",
		packageImageDescription: "Registration Sponsorship Package",
		billingFrequency: 'Monthly',
		additionalInfo: {},
		packageOptions: [
			{
				name: 'Web page banner ad & email confirmation ad',
				selected: false,
				amount: '100',
				frequency: "monthly",
				details: [
					'Includes: 1 Page-width web page ad with image/logo. Hyperlinks to a designated URL 1 Page-width email ad with image/logo. Hyperlinks to a designated URL.',
					'Include a message and offer in the email text to be sent directly to our members'
				]
			}
		],
		discount: {},
		revenueEst: 0
	},
];

export const proposalFormSchema = {
	selectedPackage: null,
	organizationName: null,
	numberOfAthletes: null,
	city: null,
	state: null,
	contactFirstName: null,
	contactLastName: null,
	contactEmail: null,
	contactPhone: null
}

export const emailFormSchema = {
	selectedPackage: null,
	organizationName: null,
	numberOfAthletes: null,
	city: null,
	state: null,
	contactFirstName: null,
	contactLastName: null,
	contactEmail: null,
	contactPhone: null,
	sponsorName: null,
	sponsorEmail: null
}

export const gmapState = {
    loaded: false,
    google: null,
    placesLoaded: false,
    locationOptions: {
    	zip: null,
    	radius: null,
    	category: null
    },
    showSaved: false,
    fetchLocations: false
}

export const slides = {
	slides: [
		{
			name: 'Slide1',
			heading: "Edina Youth Hockey Association",
			paragraph: "Edina has team, tournament, and association sponsorships. These are activated through merchandise, website representation, digital ads throughout the website, in house hockey programs, and buying programs. All types of businesses sponsor the association, including: financial management firms, restaurants, photographers and physicians.",
			earning: '125,000',
			image: 'images/cs-image-2.jpg',
		}
		/*{
			name: 'Slide2',
			heading: "Sports Org Example 2",
			paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			earning: '20,000',
			image: 'images/cs-image-1.jpg',
		},
		{
			name: 'Slide3',
			heading: "Sports Org Example 3",
			paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
			earning: '12,000',
			image: 'images/cs-image-1.jpg',
		} */
	]

}

