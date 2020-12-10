module.exports = ({siteId,siteName,ownerName,ownerContactNo,createdBy,Adderssline1,City,State,pincode,siteInaugurationDate,siteEstimate,tentativeDeadline})=>{
    return `<!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>A simple, clean, and responsive HTML invoice template</title>
        
        <style>
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            background-color : #ecf6f7;
            color : dimgrey;
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
        
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
        
        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }
        
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
        
        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }
        
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }
        
        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }
        
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
        
        .invoice-box table tr.item td{
            border-bottom: 1px solid #eee;
        }
        
        .invoice-box table tr.item.last td {
            border-bottom: none;
        }
        
        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }
        
        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }
            
            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
        
        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        }
        
        .rtl table {
            text-align: right;
        }
        
        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <h2>Digital 1</h2>
                                    <p>${siteName}</p>
                                </td>
                                <td style="text-align:left; padding-top:80px;">
                                    <p style="background: #eee;border-bottom: 1px solid #ddd;margin-block-start: 0em;margin-block-end: 0em;padding: 5px;">Site Id : ${siteId}</p>
                                    <p style="margin-block-start: 0em; margin-block-end: 0em;padding: 5px;">Site Created By : ${createdBy}</p>
                                    <p style="background: #eee;border-bottom: 1px solid #ddd;margin-block-start: 0em;margin-block-end: 0em;padding: 5px;">Site Inauguration Date : ${siteInaugurationDate}</p>
                                    <p style="margin-block-start: 0em; margin-block-end: 0em;padding: 5px;">Due : ${tentativeDeadline}</p> 
                                </td>
                            </tr>	
                        </table>
                    </td>
                </tr>
                
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    <p style="background: #eee;border-bottom: 1px solid #ddd;margin-block-start: 0em;margin-block-end: 0em;padding: 5px;">Address : ${Adderssline1}</p>
                                    <p style="margin-block-start: 0em; margin-block-end: 0em;padding: 5px;">City : ${City}</p>
                                     <p style="background: #eee;border-bottom: 1px solid #ddd;margin-block-start: 0em;margin-block-end: 0em;padding: 5px;">State : ${State}</p>
                                    <p style="margin-block-start: 0em; margin-block-end: 0em;padding: 5px;">Pincode : ${pincode}</p>						
                                </td>
                                
                                <td style="text-align:left">
                                   <p style="background: #eee;border-bottom: 1px solid #ddd;margin-block-start: 0em;margin-block-end: 0em;padding: 5px;"> Site Owner : ${ownerName}</p>
                                    <p style="margin-block-start: 0em; margin-block-end: 0em;padding: 5px;">Contact No : ${ownerContactNo}</p>
                                     <p style="background: #eee;border-bottom: 1px solid #ddd;margin-block-start: 0em;margin-block-end: 0em;padding: 5px;">Site Estimate : ${siteEstimate}<p/>
    
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>`       
}