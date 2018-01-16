<?php
$request = json_decode(file_get_contents("php://input"), false);

$hostOrg = $request->hostOrg;
$tournamentName = $request->tournamentName;	
$city = $request->city;	
$state = $request->state;	
$startDate = $request->startDate;	
$endDate = $request->endDate;	
$description = $request->description;	
$teams = $request->numOfTeams;	
$gameMin = $request->gameMin;	
$register = $request->registerBy;	
$entry = $request->entryFee;	
$website = $request->twebsiteName;	
$dirFName = $request->dirFirstName;	
$dirLName = $request->dirLastName;	
$email = $request->personalEmail;	
$phone = $request->personalPhone;	

$html = "
<style>
	body {
		background-image: url('../../assets/img/soccer-template-one.jpg');
		height: 100%;
		width: 100%;
		background-repeat: no-repeat;
		background-image-resize: 6;
	}
	
	.template-element {
		text-align: center;
	}

	div.host-name {
	  position: fixed;
      color: #fbb03b;
      font-weight: 700;
      font-size: 1.5em;
      padding-bottom: 200px;
  	}
	
	div.tournament-name {
      bottom: 62%;
      font-weight: 700;
      font-size: 3.25em; 
      color: white;
 	}

    div.date-and-location {
      top: 40%;
      color: #fbb03b;
      font-weight: 700;
      font-size: 1.5em; 
  	}
    div.tournament-details {
      position: fixed;
      font-size: 1em;
      line-height: 1.5em; 
      padding-top: 100px;
  	}
    div.tournament-description {
	    position: fixed;
	    padding-top: 40px;
	    color: white;
    }
    span.tournament-teams,
    span.tournament-minimum-games,
    span.tournament-details .tournament-deadline,
    span.tournament-details .tournament-fee {
        color: #fbb03b; 
    }
    span.tournament-contact {
      bottom: 10%;
      font-weight: 700; 
 	}
    div.tournament-contact .tournament-website {
    width: 100%;
    padding-bottom: 2%;
    font-size: 1.75em; 
    color: white;
   	}
    div.tournament-contact .contact-information {
        color: #fbb03b;
        font-size: 1em; 
    }

</style>
<body>
	<div class='gen-content-right'>
		<div class='poster-canvas template-one'>
			<div class='aspect-wrapper'>
				<div class='template-wrapper'>
					<div class='template-element host-name'><span>{$hostOrg}</span></div>
					<div class='template-element tournament-name'><span>{$tournamentName}</span></div>
					<div class='template-element date-and-location'>
						<span class='tournament-city'>{$city}</span>, <span class='tournament-state'>{$state}</span>
						<br>
						<span class='start-date'>{$startDate}</span> thru <span class='end-date'>{$endDate}</span>
					</div>
					<div class='template-element tournament-details'>
						<div class='tournament-description'>{$description}</div>
						<span class='tournament-teams'>Number of teams: <span class='teams-number'>{$teams}</span> | </span>
						<span class='tournament-minimum-games'>Game minimum: <span class='games-number'>{$gameMin}</span></span>
						<br />
						<span class='tournament-deadline'>Register by: <span class='register-date'>{$register}</span> | </span>
						<span class='tournament-fee'>Entry Fee: <span class='fee'>${$entry}</span></span>
					</div>
					<div class='template-element tournament-contact'>
						<span class='tournament-website'>{$website}</span>
						<br />
						<span class='contact-information'>Contact: 
							<span class='director-name'><span class='director-first'>{$dirFName}</span> <span class='director-last'>{$dirLName}</span> |</span>
							<span class='director-email'><span class='email'>{$website}</span> | </span>
							<span class='director-phone'>{$phone}</span>
						</span>
					</div>
				</div>		
			</div>
		</div>
	</div>
</body>
";


//==============================================================
//==============================================================
//==============================================================

include("../mpdf.php");
$mpdf=new mPDF(); 
$mpdf->SetDisplayMode('fullpage');
$mpdf->WriteHTML($html);
$mpdf->Output( SPORTNGIN . 'sportNgintest.pdf','F');

exit;
//==============================================================
//==============================================================
//==============================================================

?>