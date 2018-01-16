<?php

	include_once 'PHPMailerAutoload.php';
	require_once('class.smtp.php');

	include_once('array_column.php');
	include_once('../includes/base.php');


	$formInfo			= $_POST["selectedPackage"] === "proposal" ? $_POST["proposalForm"] : $_POST["emailForm"];
	$packageName		= $_POST["package"];
	$package 			= $_POST["packages"][array_search($packageName, array_column($_POST["packages"], 'packageName'))];
	$sponsors 			= $_POST["sponsors"];
	$uuid				= $_POST["uuid"];

	$url = "http://inspire.sportsengine.com/mpdf/tmp/" . $uuid . "-proposalEmail.pdf";

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
	$sponsorName = $formInfo['sponsorName'];
	$sponsorEmail = $formInfo['sponsorEmail'];
	$timestamp = date("Y-m-d h:i:sa");


    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$statement = $pdo->prepare("INSERT INTO email_submissions(contactFirstName, contactLastName, contactEmail, contactPhone, contactTitle, city, state, organizationName, numberOfAthletes, sponsorName, sponsorEmail, package, submissionTime) VALUES(:cfn, :cln, :ce, :cp, :ct, :cty, :ste, :orgn, :noa, :sn, :se, :pkg, :subt)");

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
		':sn' => $sponsorName,
		':se' => $sponsorEmail,
		':pkg' => $package,
		':subt' => $timestamp
	));

	date_default_timezone_set('Etc/UTC');

	// ========================
	// == PHPMAILER INSTANCE ==
	// ========================
	$mail = new PHPMailer(true);

	// ========================
	// ==   INDENTIFY SMTP   ==
	// ========================
	$mail->IsSMTP();

	try {


		// ====================
		// == SMTP DEBUGGING == ( set SMTPDebug = 2 on error )
		// ====================
		$mail->SMTPDebug = 0;

		// ==================
		// == DEBUG OUTPUT ==
		// ==================
		$mail->Debugoutput = 'html';

		// ==============
		// == HOSTNAME ==
		// ==============
		$mail->Host = 'smtp.gmail.com';

		// ================
		// == EMAIL PORT ==
		// ================
		$mail->Port = 587;

		// ================
		// == ENCRYPTION ==
		// ================
		$mail->SMTPSecure = 'tls';

		// ====================
		// == AUTHENTICATION ==
		// ====================
		$mail->SMTPAuth = true;

		// ====================
		// == AUTH USERNAME ==
		// ====================
 		$mail->Username = "*************";

		// ===================
		// == AUTH PASSWORD ==
		// ===================
 		$mail->Password = "*************";

		// ==========
		// == FROM ==
		// ==========
		$mail->setFrom("{$formInfo['contactEmail']}", "{$formInfo['contactFirstName']} {$formInfo['contactLastName']}");

		// ========
		// == TO ==
		// ========
		$mail->addAddress("{$formInfo['sponsorEmail']}", "{$formInfo['sponsorName']}");

		// ==============
		// == REPLY TO ==
		// ==============
		$mail->addReplyTo("{$formInfo['contactEmail']}", "{$formInfo['contactFirstName']} {$formInfo['contactLastName']}");

		// =============
		// == SUBJECT ==
		// =============
		$mail->Subject = "Sponsor {$formInfo['organizationName']}. Connect with our members.";

		// --------------------

		// ==========
		// == BODY ==
		// ==========
		$mail->isHTML(true);

		$mail->Body = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
						<html>

						<head>
						<title>Sponsorship Proposal</title>
						<meta name='viewport' content='width=device-width' />
						<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />

						<style type='text/css'>

						/* ////////////////////////////////////////////////////////////////// Global */
						* { margin:0; padding:0; font-family: Helvetica, Arial, sans-serif;}
						body {-webkit-font-smoothing:antialiased; -webkit-text-size-adjust:none; width: 100% !important; height: 100%;}
						a { color:#13759b; text-decoration:underline;}
						a:hover { color:#13759b; text-decoration:underline;}

						/* ////////////////// Force Outlook webmail to display emails at full width */
						.ReadMsgBody {width: 100%;background-color: #f2f3f4;}

						/* Force Hotmail to display emails at full width */
						.ExternalClass {width: 100%;background-color: #f2f3f4;}
						/* //////////////////////// Forces Hotmail to display normal line spacing. */
						.ExternalClass,
						.ExternalClass p,
						.ExternalClass span,
						.ExternalClass font,
						.ExternalClass td,
						.ExternalClass div {
							line-height:100%;
						}
						/* ///////////////////////////////////////// Resolves webkit padding issue. */
						table {border-spacing:0;}

						/* ///////////Resolves the Outlook 2007, 2010, and Gmail td padding issue. */
						table td {border-collapse:collapse;}
						table, table tr {border-collapse: collapse;}

						/* /////////////////////////////// Yahoo auto-sensing link color and border */
						.yshortcuts a {border-bottom: none !important;}

						/* iOS Dates and Numbers */
						.appleLinks a {color:#13aa37 !important; text-decoration:none;}
						.appleLinksGray a {color:#a7b1b7 !important; text-decoration:none;}
						.appleLinksDkGray a {color:#58656d !important; text-decoration:none;}
						.appleLinksBlue a {color:#13759b !important; text-decoration:none;}

						/* ///////////////////////////////////////////////////////// Media Queries */
						@media only screen and (max-width: 480px) {
							table[class='email-container'] { width: 100% !important; }
							table[class='email-container-uncard'] { width: 100% !important; border:0 !important; background:#f2f3f4 !important; }
							table[class='footer-section'] { width: 100% !important; }
							table[class='book-me-link'] { width: 100% !important; }
							table[class='headshot-container'] { width: 100% !important; }
							table[class='contact-info-container'] { width: 100% !important; }
							table[class='book-me-link'] { width: auto !important; margin: 0 auto !important; }
							td[class='content-cell'] { padding: 30px 20px !important; }
							td[class='content-cell-logo'] { padding: 15px 0 !important; }
							td[class='legal']{ text-align: center !important; }
						  img[class='hide']{ display: none !important; }
							h1[class='content-header'] { font-size: 1.25rem !important; }
							p[class='content-text'] { font-size: 0.875rem !important; }
							p[class='callout'] { font-size: 1em !important; }
							p[class='contact-text'] { font-size: 0.8rem !important; text-align: center !important; padding-bottom: 20px !important; border-bottom: 1px solid #d5dadd !important;}
							a[class='button'] { width: 100% !important; }
							img[class='full-width'] { width: 100% !important; }
						}
						</style>
						</head>
						<body bgcolor='#f2f3f4' leftmargin='0' topmargin='0' marginwidth='0' marginheight='0' style='margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none; background-color: #f2f3f4;'>

						<!-- Content -->
						<table width='100%' cellspacing='0' cellpadding='0' border='0'>
							<tr>
								<td class='email-wrapper' align='center' valign='top' bgcolor='#f2f3f4' style='padding: 10px;'>
									<table class='email-container' width='580' cellspacing='0' cellpadding='0' border='0' style='background-color:#ffffff; border:1px solid #d5dadd; border-collapse:collapse; box-shadow:0px 1px 3px #e8ebec; width: 580px;'>

										<!-- Content -->
										<tr>
											<td class='content-cell' bgcolor='#ffffff' align='left' valign='top' style='padding: 50px 35px;'>

										<p class='content-text' style='font-family:Helvetica, Arial, sans-serif; font-size:12px; line-height:100%; margin: 0 0 20px 0; padding: 0 5px 10px 5px; color:#23282b; letter-spacing: 0.1em; font-weight:normal; border-bottom: 2px solid #e16428'>SPONSORSHIP PROPOSAL</p>

						  				 <h1 class='content-header' style='font-family:Helvetica, Arial, sans-serif; font-size:24px; line-height:125%; margin: 0 0 12px 0; color:#23282b; font-weight:bold;'>Support {$formInfo['organizationName']} and connect with our coaches, athletes and parents</h1>

						                <p class='content-text' style='font-family:Georgia, serif; font-size:15px; line-height:150%; margin: 0 0 15px 0; color:#58656d; font-weight:normal;'>My name is {$formInfo['contactFirstName']} {$formInfo['contactLastName']} and I&rsquo;m the {$formInfo['contactTitle']} for the {$formInfo['organizationName']}. We&rsquo;re the proud home of {$formInfo['numberOfAthletes']} youth athletes who represent the next generation of our community.</p>

						                <p class='content-text' style='font-family:Georgia, serif; font-size:15px; line-height:150%; margin: 0 0 15px 0; color:#58656d; font-weight:normal;'>I&rsquo;m writing to you because we rely on the support of local businesses like yours to help give every kid the chance to play the sport that they love. Sports teach our kids about the value of teamwork, dedication, and discipline while helping them build character, confidence, and friendships that will last a lifetime.</p>

						                <p class='content-text' style='font-family:Georgia, serif; font-size:15px; line-height:150%; margin: 0 0 15px 0; color:#58656d; font-weight:normal;'>You can help us continue to provide kids with these opportunities by becoming a sponsor. The parents and athletes at our club love to support the businesses that support them. This sponsorship will give you a direct connection to our club&rsquo;s parents, athletes, and fans where you can extend special offers, discounts, and messages of encouragement</p>

						                <p class='content-text' style='font-family:Georgia, serif; font-size:15px; line-height:150%; margin: 0 0 15px 0; color:#58656d; font-weight:normal;'><a href='{$url}' style='font-weight: bold; color: #008cc3;'>Click here for the sponsorship proposal details</a></p>

						                <p class='content-text' style='font-family:Georgia, serif; font-size:15px; line-height:150%; margin: 0 0 15px 0; color:#58656d; font-weight:normal;'>When our community works together, we win together! Thank you for your time and your consideration.</p>

						                <p class='content-text' style='font-family:Helvetica, Arial, sans-serif; font-size:15px; line-height:140%; margin: 00; padding: 15px 0 0 0; color:#23282b; font-weight:bold; border-top: 1px solid #e16428'>
							                {$formInfo['contactFirstName']} {$formInfo['contactLastName']}<br />
											{$formInfo['contactTitle']}<br />
											{$formInfo['contactPhone']}<br />
											<a href='mailto:{$formInfo['contactEmail']}' style='color: #008cc3;'>{$formInfo['contactEmail']}</a>
						                </p>

											</td>
										</tr>


									</table>
								</td>
							</tr>
						</table>

								</td>
							</tr>
						</table>
					</body>
					</html>";

		//Replace the plain text body with one created manually
		$mail->AltBody = 'This is a plain-text message body';

		$mail->send();
		$mailInfo = array(
			"formInfo" 			=> $formInfo,
			"package" 			=> $package,
			"sponsors" 			=> $sponsors,
			"packageName" 		=> $packageName,
			"uuid" 				=> $uuid
		);
		echo json_encode($mailInfo);

	} catch (phpmailerException $e ) {

		echo $e->errorMessage(); //Pretty error messages from PHPMailer

	} catch (Exception $e) {

		echo $e->getMessage();

	}

?>
