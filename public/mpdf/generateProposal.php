<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: * ");
include_once('array_column.php');
include_once('../includes/base.php');


$formInfo			= $_POST["selectedPackage"] === "proposal" ? $_POST["proposalForm"] : $_POST["emailForm"];
$packageName		= $_POST["package"];
$package_details 	= $_POST["packages"][array_search($packageName, array_column($_POST["packages"], 'packageName'))];
$sponsors 			= $_POST["sponsors"];
$uuid				= $_POST["uuid"];


switch(strtolower($packageName)){
	case 'website':
		$imgUrl = '../images/display-graphic_pdf-website.png';
		break;
	case 'email':
		$imgUrl = '../images/display-graphic_pdf-email.png';
		break;
	case 'registration':
		$imgUrl = '../images/display-graphic_pdf-registration.png';
		break;
	default:
		$imgUrl = '../images/display-graphic_pdf-website.png';
		break;
}

$contactFirst = $formInfo['contactFirstName'];
$contactLast = $formInfo['contactLastName'];
$contactEmail = $formInfo['contactEmail'];
$contactPhone = $formInfo['contactPhone'];
$contactTitle = $formInfo['contactTitle'];
$city = $formInfo['city'];
$state = $formInfo['state'];
$organizationName = $formInfo['organizationName'];
$numberOfAthletes = $formInfo['numberOfAthletes'];
$package = $formInfo['package'];
$timestamp = date("Y-m-d h:i:sa");


$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$statement = $pdo->prepare("INSERT INTO proposal_submissions(contactFirstName, contactLastName, contactEmail, contactPhone, contactTitle, city, state, organizationName, numberOfAthletes, package, submissionTime) VALUES(:cfn, :cln, :ce, :cp, :ct, :cty, :ste, :orgn, :noa, :pkg, :subt)");

$statement->execute(array(
	':cfn' => $contactFirst,
	':cln' => $contactLast,
	':ce' => $contactEmail,
	':cp' => $contactPhone,
	':ct' => $contactTitle,
	':cty' => $city,
	':ste' => $state,
	':orgn' => $organizationName,
	':noa' => $numberOfAthletes,
	':pkg' => $package,
	':subt' => $timestamp
));



$html = "
<html>
<head>
<style>

	@page {
		size: 8.5in 11in;
		sheet-size: 8.5in 11in;
		margin: 0;
	}

	body {
		margin: 0;
		margin-collapse: collapse;
		font-family: 'Droid Serif', serif;
	}

	p {
		font-size: 10pt;
		line-height: 160%;
		margin: 0 0 10pt 0;
	}

	h1, h2, h3 {
		font-family: 'Gotham', sans-serif;
		color: #23282b;
	}

	h1 {
		font-size: 48pt;
		text-transform: uppercase;
		font-weight: bold;
		margin-bottom: 5pt;
		line-height: 1.1;
	}

	h2 {
		font-size: 20pt;
		font-weight: bold;
		margin: 0 0 10pt 0;
	}

	h3 {
		text-transform: uppercase;
		font-weight: normal;
		font-size: 10pt;
		letter-spacing: 0.1pt;
		margin: 0;
	}

	table {
		border: 0;
		border-collapse: collapse;
	}

	div.masthead {
		position: fixed;
		left: 5%;
		top: 5%;
		width: 90%;
		padding: 0 5px 10px 5px;
		border-bottom: 2px solid #e16428;
	}

	div.cover-headline {
		position: fixed;
		left: 5%;
		bottom: 35%;
		width: 90%;
	}

	div.cover-headline .subhead {
		font-size: 18pt;
		font-weight: bold;
		font-style: italic;
	}

	div.cover-contact {
		position: fixed;
		left: 5%;
		top: 75%;
		width: 90%;
		height: 20%;
		background: #e16428;
	}

	div.cover-contact p.prepared-by {
		font-family: 'Gotham', sans-serif;
		font-weight: normal;
		font-size: 10pt;
		color: #ffffff;
		margin: 0 0 5pt 0;
		padding: 30px 30px 5px 30px;
	}

	div.cover-contact p.cover-contact-info {
		font-size: 11pt;
		color: white;
		margin: 0;
	}

	div.letter {
		position: fixed;
		left: 20%;
		top: 15%;
		width: 65%;
	}

	div.package-detail-container {
		position: fixed;
		left: 5%;
		top: 15%;
		width: 90%;
	}

	table.package-details-table {
		width: 100%;
		background: #f2f3f4;
		border-top: 2px solid #23282b;
	}

	table.package-details-table td {
		padding: 15px;
		border-bottom: 2px solid #fff;
		font-size: 10px;
	}

	table.package-details-table td.description-column {
		width: 66.6%;
	}

	table.package-details-table td.price-column {
		width: 33.3%;
	}

	table.package-details-table span.package-name {
		display: inline-block;
		width: 100%;
		font-family: 'Gotham', sans-serif;
		font-weight: bold;
		text-transform: uppercase;
	}

	table.package-details-table span.package-price {
		display: inline-block;
		width: 100%;
		font-family: 'Gotham', sans-serif;
		font-size: 15pt;
	}

	table.package-details-table span.package-price .dollar-sign {
		font-size: 8pt;
	}


</style>

</head>

<body>

	<div class='masthead'>
		<h3>{$formInfo['organizationName']} Sponsorship Proposal</h3>
	</div>

	<div class='cover-headline'>
		<h1>Sponsorship<br />Proposal</h1>
		<p class='subhead' style='color: #23282b; font-family: Droid Serif, serif; font-size: 15pt; font-style: italic;'>Support {$formInfo['organizationName']}, and connect your business with our parents, coaches and athletes.</p>
	</div>
	<div class='cover-contact'>
		<p class='prepared-by' style='color: white; padding: 30px 0 0 30px; margin: 0 0 5px 0; font-family: Gotham, sans-serif; font-size: 10pt;'>Prepared by:</p>
		<p class='cover-contact-info' style='color: white; padding: 0 0 0 30px; margin: 0 0 5px 0; font-family: Droid Serif, serif; font-size: 11pt;'>{$formInfo['contactFirstName']} {$formInfo['contactLastName']}<br />
			{$formInfo['contactTitle']}<br />
			{$formInfo['contactPhone']}<br />
			{$formInfo['contactEmail']}
		</p>
	</div>

	<pagebreak />

	<div class='masthead'>
		<h3>{$formInfo['organizationName']} Sponsorship Proposal</h3>
	</div>

	<div class='letter'>
		<div>
			<p style='color: #23282b; font-weight: bold; font-size: 10pt; line-height: 1.5;'>Dear Community Partner,</p>
		</div>

		<div style='padding-top: 20px;'>
			<p style='color: #23282b; font-size: 10pt; line-height: 1.5;'>My name is {$formInfo['contactFirstName']} {$formInfo['contactLastName']} and I&rsquo;m the {$formInfo['contactTitle']} for the {$formInfo['organizationName']}. We&rsquo;re the proud home of {$formInfo['numberOfAthletes']} youth athletes who represent the next generation of our community.</p>
		</div>

		<div style='padding-top: 20px;'>
			<p style='color: #23282b; font-size: 10pt; line-height: 1.5;'>I&rsquo;m writing to you because we rely on the support of local businesses like yours to help give every kid the chance to play the sport that they love. Sports teach our kids about the value of teamwork, dedication, and discipline while helping them build character, confidence, and friendships that will last a lifetime.</p>
		</div>

		<div style='padding-top: 20px;'>
			<p style='color: #23282b; font-size: 10pt; line-height: 1.5;'>You can help us continue to provide kids with these opportunities by becoming a sponsor. The parents and athletes at our club love to support the businesses that support them. This sponsorship will give you a direct connection to our club&rsquo;s parents, athletes, and fans where you can extend special offers, discounts, and messages of encouragement.</p>
		</div>

		<div style='padding-top: 20px;'>
			<p style='color: #23282b; font-size: 10pt; line-height: 1.5;'>You will find a summary of the sponsorship details enclosed with this letter.</p>
		</div>

		<div style='padding-top: 20px;'>
			<p style='color: #23282b; font-size: 10pt; line-height: 1.5;'>When our community works together, we win together! Thank you for your time and your consideration.</p>
		</div>

		<div style='padding-top: 20px;'>
			<p style='color: #23282b; font-size: 10pt; font-weight: bold; line-height: 15pt;'>{$formInfo['contactFirstName']} {$formInfo['contactLastName']}<br />
			{$formInfo['contactTitle']}<br />
			{$formInfo['contactPhone']}<br />
			{$formInfo['contactEmail']}
			</p>
		</div>

	</div>

	<pagebreak />

	<div class='masthead'>
		<h3>{$formInfo['organizationName']} Sponsorship Proposal</h3>
	</div>

	<div class='package-detail-container'>
		<img src='{$imgUrl}' alt='Website Sponsor Package' width='100%'>
		<br /><br />
		<h2>{$packageName} Sponsorship Package</h2>
		<table class='package-details-table' cellspacing='0' cellpadding='0'>";
		// Init Package Details Array
		$packageDetails = array();
		foreach( $formInfo["packDetails"] as $detailItem ) {
			// Generate a Tables Rows for Package Details Dynamically
			$packageInfo = 	"<tr>";
			$packageInfo .=		"<td class='description-column' style='line-height: 15pt; color: #23282b;'>";
			$packageInfo .=			"<span class='package-name' style='font-size: 12pt; font-family: Gotham, sans-serif;'>{$detailItem['name']}</span><br />";
			//Loop over the descriptions if necessary and add them Dynamically.
			foreach( $detailItem["details"] as $detail ) {
				$packageInfo .=		"<span style='font-size: 10pt; font-family: Droid Serif, serif;'>{$detail}</span>";
			}
			// Back to the Original Table

			// AVANT :: Fix frequency variable assignment
			$packageInfo .=		"</td>";
			$packageInfo .=		"<td class='price-column'>";
			$packageInfo .=			"<span class='package-price' style='font-family: Gotham, sans-serif; font-size: 15pt' ><sup class='dollar-sign' style='font-size: 8pt;'>$</sup>{$detailItem['amount']}/{$package_details['billingFrequency']}</span>";
			$packageInfo .=		"</td>";
			$packageInfo .=	"</tr>";
			// Push the formatted string onto the packageDetails Array to be concatenated and Display on the last Page.
			$packageDetails[] = $packageInfo;
		}
		// Concatenate all elements in the array into one long string
		$packageDetails = implode("", $packageDetails);
		// End Detail Loop related stuff and concatenate the string onto HTML
		$html .= $packageDetails;
$html .= "</table>
	</div>
";
$html .= "</body> </html> ";



//==============================================================
//==============================================================
//==============================================================

include("./mpdf.php");

$mpdf= new mPDF();
$mpdf->SetDisplayMode('fullpage');
$mpdf->WriteHTML($html);
$mpdf->Output( SPORTNGIN . $uuid .'-proposalEmail.pdf','F');

$results = array(
	"formInfo" 			=> $formInfo,
	"package" 			=> $package,
	"sponsors" 			=> $sponsors,
	"packageName"		=> $packageName,
	"uuid" 				=> $uuid
);

echo json_encode($results);

//==============================================================
//==============================================================
//==============================================================

// MARKETO PUSH

//==============================================================
//==============================================================
//==============================================================


include_once('../marketo/MarketoPush.php');

$lead = new stdClass();
$lead->email = $contactEmail;
$lead->firstName = $contactFirst;
$lead->lastName = $contactLast;
$lead->company = $organizationName;
$lead->city = $city;
$lead->state = $state; //Send Full
$lead->phone = $contactPhone;
$lead->title = $contactTitle;
$lead->Number_of_Athletes__c = $numberOfAthletes;
$lead->utm_campaign__c = "Sponsorship+App";
$lead->utm_source__c = "Sponsorship+App";
$lead->utm_term__c = "Sponsorship+App";
$lead->LeadSource = "Sport+Ngin+Platform";
//Can send zip based on city?
//Should send munchkin data? from cookie

$Marketo = new MarketoPush();
$Marketo->action = 'createOrUpdate';
$Marketo->input = array($lead);

echo $Marketo->postData();

exit;
//==============================================================
//==============================================================
//==============================================================


