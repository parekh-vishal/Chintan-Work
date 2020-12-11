module.exports = ({siteId,siteName,ownerName,ownerContactNo,createdBy,Adderssline1,City,State,pincode,siteInaugurationDate,siteEstimate,tentativeDeadline})=>{
    return `<!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>A simple, clean, and responsive HTML invoice template</title>
        
        <style>
			body
			{
		    display: block;
			margin: 0 auto;
			width: 100%;
			/*height: 29.7cm; */
			padding: 30px;
			/*border: 1px solid #d1d1d1; */
			color: #333;
			font-size: 14px;
			line-height: 24px;
			font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
		}
		.clear {
			clear: both;
			float: none;
			height: 1px;
			margin: 0px;
			padding: 0px;
			overflow: hidden;
		}
			 
        </style>
    </head>
    
    <body>
            <table cellpadding="0" cellspacing="0" style="border:none;width:90%">
                <tr>
                    <td colspan="2">
                        <table  cellpadding="0" cellspacing="0" style="width:100% ;">
                            <tr>
                                <td style="width:50%;    vertical-align: top;">
                                    <h3 style="font-size:24px;margin-top:10px;margin-bottom:15px">Digital 1</h3>
                                    <p style="font-weight:bold">${siteName}</p>
                                </td>
                                <td style="width:50%">
								<table  cellpadding="5" style="width:100% ;border:1px solid #d1d1d1;width:100%; border-collapse: collapse;">
								<tr>
								<td style="width:40%;border-bottom:1px solid #d1d1d1;font-weight:bold">Site Id </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${siteId}</td>
								</tr>
								
								<tr>
								<td style="width:40%;border-bottom:1px solid #d1d1d1;font-weight:bold">Site Created By </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${createdBy}</td>								 
								</tr>
								
								<tr>
								<td style="width:40%;border-bottom:1px solid #d1d1d1;font-weight:bold">Site Inauguration Date  </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${siteInaugurationDate}</td>
								 
								</tr>
								<tr>
								<td style="width:40%;border-bottom:1px solid #d1d1d1;font-weight:bold">Due </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${tentativeDeadline}</td>
								
								 
								</tr>
								
								</table> 
                                </td>
                            </tr>	
                        </table>
                    </td>
                </tr>
                 <tr class="top">
                    <td colspan="2">
					<hr style=" margin-top: 30px;  margin-bottom: 30px;  border-top: 1px solid #d1d1d1;  border-bottom: none;"/>
					  </td>
                </tr>
				
				<tr>
                    <td colspan="2">
                        <table  cellpadding="0" cellspacing="0" style="width:100% ;">
                            <tr>
                                <td style="width:48%;vertical-align:top ">
                                  <table  cellpadding="5" style="width:100% ;border:1px solid #d1d1d1;width:100%; border-collapse: collapse;">
								<tr>
								<td style="width:30%;border-bottom:1px solid #d1d1d1;font-weight:bold">Address  </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${Adderssline1}</td>
								</tr>
								
								<tr>
								<td style="width:30%;border-bottom:1px solid #d1d1d1;font-weight:bold">City </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${City}</td>								 
								</tr>
								
								<tr>
								<td style="width:30%;border-bottom:1px solid #d1d1d1;font-weight:bold">State </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${State} </td>
								 
								</tr>
								<tr>
								<td style="width:30%;border-bottom:1px solid #d1d1d1;font-weight:bold">Pincode </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${pincode} </td>
								
								 
								</tr>
								
								</table> 
                                </td>
								<td style="width:4%;vertical-align:top">
								<div style="border-right:1px solid #d1d1d1;height:140px;width:1px;display: block;margin: 0 auto;"></div>
								</td>
                                <td style="width:48%;vertical-align:top">
								<table  cellpadding="5" style="width:100% ;border:1px solid #d1d1d1;width:100%; border-collapse: collapse;">
								<tr>
								<td style="width:30%;border-bottom:1px solid #d1d1d1;font-weight:bold">Site Owner  </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${ownerName}</td>
								</tr>
								
								<tr>
								<td style="width:30%;;border-bottom:1px solid #d1d1d1;font-weight:bold">Contact No  </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${ownerContactNo}</td>								 
								</tr>
								
								<tr>
								<td style="width:30%;border-bottom:1px solid #d1d1d1;font-weight:bold">Site Estimate  </td>
								<td style=" border-bottom:1px solid #d1d1d1;">:</td>
								<td style=" border-bottom:1px solid #d1d1d1;">${siteEstimate}</td>
								 
								</tr>
							 
								
								</table> 
                                </td>
                            </tr>	
                        </table>
                    </td>
                </tr>
				 
            </table>
    </body>
    </html>`       
}