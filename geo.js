// Country, region and time-zone helpers for NISMCAA Tutor (browser).
// Country, region and time-zone helpers for NISMCAA Tutor. Missing country is treated as US.
const COUNTRIES=[
['AF','Afghanistan'],['AX','Åland Islands'],['AL','Albania'],['DZ','Algeria'],['AS','American Samoa'],['AD','Andorra'],['AO','Angola'],['AI','Anguilla'],['AQ','Antarctica'],['AG','Antigua and Barbuda'],
['AR','Argentina'],['AM','Armenia'],['AW','Aruba'],['AU','Australia'],['AT','Austria'],['AZ','Azerbaijan'],['BS','Bahamas'],['BH','Bahrain'],['BD','Bangladesh'],['BB','Barbados'],
['BY','Belarus'],['BE','Belgium'],['BZ','Belize'],['BJ','Benin'],['BM','Bermuda'],['BT','Bhutan'],['BO','Bolivia'],['BQ','Bonaire, Sint Eustatius and Saba'],['BA','Bosnia and Herzegovina'],['BW','Botswana'],
['BV','Bouvet Island'],['BR','Brazil'],['IO','British Indian Ocean Territory'],['BN','Brunei'],['BG','Bulgaria'],['BF','Burkina Faso'],['BI','Burundi'],['CV','Cabo Verde'],['KH','Cambodia'],['CM','Cameroon'],
['CA','Canada'],['KY','Cayman Islands'],['CF','Central African Republic'],['TD','Chad'],['CL','Chile'],['CN','China'],['CX','Christmas Island'],['CC','Cocos (Keeling) Islands'],['CO','Colombia'],['KM','Comoros'],
['CG','Congo'],['CD','Congo (DRC)'],['CK','Cook Islands'],['CR','Costa Rica'],['CI','Côte d’Ivoire'],['HR','Croatia'],['CU','Cuba'],['CW','Curaçao'],['CY','Cyprus'],['CZ','Czechia'],
['DK','Denmark'],['DJ','Djibouti'],['DM','Dominica'],['DO','Dominican Republic'],['EC','Ecuador'],['EG','Egypt'],['SV','El Salvador'],['GQ','Equatorial Guinea'],['ER','Eritrea'],['EE','Estonia'],
['SZ','Eswatini'],['ET','Ethiopia'],['FK','Falkland Islands'],['FO','Faroe Islands'],['FJ','Fiji'],['FI','Finland'],['FR','France'],['GF','French Guiana'],['PF','French Polynesia'],['TF','French Southern Territories'],
['GA','Gabon'],['GM','Gambia'],['GE','Georgia'],['DE','Germany'],['GH','Ghana'],['GI','Gibraltar'],['GR','Greece'],['GL','Greenland'],['GD','Grenada'],['GP','Guadeloupe'],
['GU','Guam'],['GT','Guatemala'],['GG','Guernsey'],['GN','Guinea'],['GW','Guinea-Bissau'],['GY','Guyana'],['HT','Haiti'],['HM','Heard Island and McDonald Islands'],['HN','Honduras'],['HK','Hong Kong'],
['HU','Hungary'],['IS','Iceland'],['IN','India'],['ID','Indonesia'],['IR','Iran'],['IQ','Iraq'],['IE','Ireland'],['IM','Isle of Man'],['IL','Israel'],['IT','Italy'],
['JM','Jamaica'],['JP','Japan'],['JE','Jersey'],['JO','Jordan'],['KZ','Kazakhstan'],['KE','Kenya'],['KI','Kiribati'],['KP','Korea (North)'],['KR','Korea (South)'],['KW','Kuwait'],
['KG','Kyrgyzstan'],['LA','Laos'],['LV','Latvia'],['LB','Lebanon'],['LS','Lesotho'],['LR','Liberia'],['LY','Libya'],['LI','Liechtenstein'],['LT','Lithuania'],['LU','Luxembourg'],
['MO','Macao'],['MG','Madagascar'],['MW','Malawi'],['MY','Malaysia'],['MV','Maldives'],['ML','Mali'],['MT','Malta'],['MH','Marshall Islands'],['MQ','Martinique'],['MR','Mauritania'],
['MU','Mauritius'],['YT','Mayotte'],['MX','Mexico'],['FM','Micronesia'],['MD','Moldova'],['MC','Monaco'],['MN','Mongolia'],['ME','Montenegro'],['MS','Montserrat'],['MA','Morocco'],
['MZ','Mozambique'],['MM','Myanmar'],['NA','Namibia'],['NR','Nauru'],['NP','Nepal'],['NL','Netherlands'],['NC','New Caledonia'],['NZ','New Zealand'],['NI','Nicaragua'],['NE','Niger'],
['NG','Nigeria'],['NU','Niue'],['NF','Norfolk Island'],['MK','North Macedonia'],['MP','Northern Mariana Islands'],['NO','Norway'],['OM','Oman'],['PK','Pakistan'],['PW','Palau'],['PS','Palestine'],
['PA','Panama'],['PG','Papua New Guinea'],['PY','Paraguay'],['PE','Peru'],['PH','Philippines'],['PN','Pitcairn'],['PL','Poland'],['PT','Portugal'],['PR','Puerto Rico'],['QA','Qatar'],
['RE','Réunion'],['RO','Romania'],['RU','Russia'],['RW','Rwanda'],['BL','Saint Barthélemy'],['SH','Saint Helena'],['KN','Saint Kitts and Nevis'],['LC','Saint Lucia'],['MF','Saint Martin'],['PM','Saint Pierre and Miquelon'],
['VC','Saint Vincent and the Grenadines'],['WS','Samoa'],['SM','San Marino'],['ST','São Tomé and Príncipe'],['SA','Saudi Arabia'],['SN','Senegal'],['RS','Serbia'],['SC','Seychelles'],['SL','Sierra Leone'],['SG','Singapore'],
['SX','Sint Maarten'],['SK','Slovakia'],['SI','Slovenia'],['SB','Solomon Islands'],['SO','Somalia'],['ZA','South Africa'],['GS','South Georgia and the South Sandwich Islands'],['SS','South Sudan'],['ES','Spain'],['LK','Sri Lanka'],
['SD','Sudan'],['SR','Suriname'],['SJ','Svalbard and Jan Mayen'],['SE','Sweden'],['CH','Switzerland'],['SY','Syria'],['TW','Taiwan'],['TJ','Tajikistan'],['TZ','Tanzania'],['TH','Thailand'],
['TL','Timor-Leste'],['TG','Togo'],['TK','Tokelau'],['TO','Tonga'],['TT','Trinidad and Tobago'],['TN','Tunisia'],['TR','Türkiye'],['TM','Turkmenistan'],['TC','Turks and Caicos Islands'],['TV','Tuvalu'],
['UG','Uganda'],['UA','Ukraine'],['AE','United Arab Emirates'],['GB','United Kingdom'],['US','United States'],['UM','United States Minor Outlying Islands'],['UY','Uruguay'],['UZ','Uzbekistan'],['VU','Vanuatu'],['VA','Vatican City'],
['VE','Venezuela'],['VN','Vietnam'],['VG','Virgin Islands (British)'],['VI','Virgin Islands (U.S.)'],['WF','Wallis and Futuna'],['EH','Western Sahara'],['YE','Yemen'],['ZM','Zambia'],['ZW','Zimbabwe']
];
const FAVOURITES=['US','GB','NG','CA'];
const US_STATES=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const UK_NATIONS=['England','Scotland','Wales','Northern Ireland'];
const UK_ENGLAND=['Bedfordshire','Berkshire','Bristol','Buckinghamshire','Cambridgeshire','Cheshire','City of London','Cornwall','Cumbria','Derbyshire','Devon','Dorset','Durham','East Riding of Yorkshire','East Sussex','Essex','Gloucestershire','Greater London','Greater Manchester','Hampshire','Herefordshire','Hertfordshire','Isle of Wight','Kent','Lancashire','Leicestershire','Lincolnshire','Merseyside','Norfolk','North Yorkshire','Northamptonshire','Northumberland','Nottinghamshire','Oxfordshire','Rutland','Shropshire','Somerset','South Yorkshire','Staffordshire','Suffolk','Surrey','Tyne and Wear','Warwickshire','West Midlands','West Sussex','West Yorkshire','Wiltshire','Worcestershire'];
const UK_SCOTLAND=['Aberdeen','Aberdeenshire','Angus','Argyll and Bute','Clackmannanshire','Dumfries and Galloway','Dundee','East Ayrshire','East Dunbartonshire','East Lothian','East Renfrewshire','Edinburgh','Falkirk','Fife','Glasgow','Highland','Inverclyde','Midlothian','Moray','Na h-Eileanan Siar','North Ayrshire','North Lanarkshire','Orkney','Perth and Kinross','Renfrewshire','Scottish Borders','Shetland','South Ayrshire','South Lanarkshire','Stirling','West Dunbartonshire','West Lothian'];
const UK_WALES=['Blaenau Gwent','Bridgend','Caerphilly','Cardiff','Carmarthenshire','Ceredigion','Conwy','Denbighshire','Flintshire','Gwynedd','Isle of Anglesey','Merthyr Tydfil','Monmouthshire','Neath Port Talbot','Newport','Pembrokeshire','Powys','Rhondda Cynon Taf','Swansea','Torfaen','Vale of Glamorgan','Wrexham'];
const UK_NI=['Antrim','Armagh','Down','Fermanagh','Londonderry','Tyrone'];
const UK_REGIONS=[...UK_NATIONS,...UK_ENGLAND,...UK_SCOTLAND,...UK_WALES,...UK_NI];
const NG_STATES=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Federal Capital Territory','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];
const CA_REGIONS=['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador','Northwest Territories','Nova Scotia','Nunavut','Ontario','Prince Edward Island','Quebec','Saskatchewan','Yukon'];
const REGIONS={US:US_STATES,GB:UK_REGIONS,NG:NG_STATES,CA:CA_REGIONS};
const UK_GROUPS=[['Nations',UK_NATIONS],['England',UK_ENGLAND],['Scotland',UK_SCOTLAND],['Wales',UK_WALES],['Northern Ireland',UK_NI]];
const REGION_GROUPS={GB:UK_GROUPS};
const US_TZ=['America/New_York','America/Detroit','America/Kentucky/Louisville','America/Kentucky/Monticello','America/Indiana/Indianapolis','America/Indiana/Marengo','America/Indiana/Vincennes','America/Indiana/Tell_City','America/Indiana/Winamac','America/Indiana/Knox','America/Indiana/Petersburg','America/Indiana/Vevay','America/Chicago','America/Indiana/Tell_City','America/North_Dakota/Center','America/North_Dakota/New_Salem','America/North_Dakota/Beulah','America/Denver','America/Boise','America/Phoenix','America/Los_Angeles','America/Anchorage','America/Juneau','America/Sitka','America/Metlakatla','America/Yakutat','America/Nome','America/Adak','Pacific/Honolulu'];
const CA_TZ=['America/St_Johns','America/Halifax','America/Glace_Bay','America/Moncton','America/Goose_Bay','America/Blanc-Sablon','America/Toronto','America/Iqaluit','America/Nipigon','America/Thunder_Bay','America/Winnipeg','America/Rainy_River','America/Resolute','America/Rankin_Inlet','America/Regina','America/Swift_Current','America/Edmonton','America/Cambridge_Bay','America/Yellowknife','America/Inuvik','America/Creston','America/Dawson_Creek','America/Fort_Nelson','America/Whitehorse','America/Dawson','America/Vancouver'];
const COUNTRY_TZ={
  US:[...new Set(US_TZ)],
  GB:['Europe/London'],
  NG:['Africa/Lagos'],
  CA:[...new Set(CA_TZ)],
  IE:['Europe/Dublin'],AU:['Australia/Sydney','Australia/Melbourne','Australia/Brisbane','Australia/Adelaide','Australia/Perth','Australia/Hobart','Australia/Darwin','Australia/Lord_Howe','Australia/Eucla','Australia/Broken_Hill','Pacific/Lord_Howe'],
  NZ:['Pacific/Auckland','Pacific/Chatham'],ZA:['Africa/Johannesburg'],GH:['Africa/Accra'],KE:['Africa/Nairobi'],IN:['Asia/Kolkata'],PK:['Asia/Karachi'],
  AE:['Asia/Dubai'],SA:['Asia/Riyadh'],SG:['Asia/Singapore'],MY:['Asia/Kuala_Lumpur'],PH:['Asia/Manila'],JP:['Asia/Tokyo'],KR:['Asia/Seoul'],CN:['Asia/Shanghai'],HK:['Asia/Hong_Kong'],
  FR:['Europe/Paris'],DE:['Europe/Berlin'],ES:['Europe/Madrid','Atlantic/Canary'],IT:['Europe/Rome'],NL:['Europe/Amsterdam'],BE:['Europe/Brussels'],PT:['Europe/Lisbon','Atlantic/Azores','Atlantic/Madeira'],
  CH:['Europe/Zurich'],AT:['Europe/Vienna'],SE:['Europe/Stockholm'],NO:['Europe/Oslo'],DK:['Europe/Copenhagen'],FI:['Europe/Helsinki'],PL:['Europe/Warsaw'],IE:['Europe/Dublin'],
  BR:['America/Sao_Paulo','America/Fortaleza','America/Recife','America/Bahia','America/Manaus','America/Cuiaba','America/Belem','America/Porto_Velho','America/Rio_Branco','America/Noronha'],
  MX:['America/Mexico_City','America/Cancun','America/Merida','America/Monterrey','America/Mazatlan','America/Tijuana','America/Chihuahua','America/Hermosillo','America/Matamoros'],
  JM:['America/Jamaica'],TT:['America/Port_of_Spain']
};
const COUNTRY_BY_CODE=Object.fromEntries(COUNTRIES);
const ALIAS={UK:'GB',GBR:'GB',USA:'US','UNITED STATES':'US','UNITED KINGDOM':'GB',ENGLAND:'GB',NIGERIA:'NG',CANADA:'CA'};
function normalizeCountry(code){
  const raw=String(code==null?'':code).trim();
  if(!raw)return 'US';
  const up=raw.toUpperCase();
  if(COUNTRY_BY_CODE[up])return up;
  if(ALIAS[up])return ALIAS[up];
  const byName=COUNTRIES.find(([,n])=>n.toUpperCase()===up);
  return byName?byName[0]:'US';
}
function validCountry(code){
  if(code==null||String(code).trim()==='')return 'US';
  const up=String(code).trim().toUpperCase();
  const n=COUNTRY_BY_CODE[up]?up:ALIAS[up];
  return n||null;
}
function countryName(code){const c=normalizeCountry(code);return COUNTRY_BY_CODE[c]||'United States'}
function validRegion(country,region){
  const cc=normalizeCountry(country);
  const r=String(region==null?'':region).replace(/[\u0000-\u001f]/g,' ').trim().slice(0,80);
  const list=REGIONS[cc];
  if(list)return list.includes(r)?r:null;
  return r;
}
function validTz(z){
  const tz=String(z==null?'':z).trim();
  if(!tz||tz.length>80||/[\u0000-\u001f]/.test(tz))return false;
  try{new Intl.DateTimeFormat('en-US',{timeZone:tz}).format(new Date());return true}catch{return false}
}
function tzAbbr(z,fallbackMap){
  if(fallbackMap&&fallbackMap[z])return fallbackMap[z];
  try{
    const p=new Intl.DateTimeFormat('en-US',{timeZone:z,timeZoneName:'short'}).formatToParts(new Date());
    return (p.find(x=>x.type==='timeZoneName')||{}).value||z;
  }catch{return z||''}
}
function inferCountry(tz){
  if(!validTz(tz))return 'US';
  if(tz==='Europe/London'||tz==='Europe/Belfast')return 'GB';
  if(tz==='Africa/Lagos')return 'NG';
  for(const[cc,list]of Object.entries(COUNTRY_TZ)){
    if(list.includes(tz))return cc;
  }
  return 'US';
}
function suggestedTz(country){return COUNTRY_TZ[normalizeCountry(country)]||[]}
function isUs(country){return normalizeCountry(country)==='US'}
function taxApplies(country){return isUs(country)}

function allTimeZones(){
  try{return Intl.supportedValuesOf('timeZone')}catch(e){
    return ['UTC','America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Phoenix','America/Anchorage','Pacific/Honolulu','Europe/London','Europe/Dublin','Africa/Lagos','Africa/Johannesburg','America/Toronto','America/Vancouver','America/Edmonton','America/Winnipeg','America/Halifax','America/St_Johns','Asia/Kolkata','Asia/Dubai','Asia/Singapore','Australia/Sydney'];
  }
}
function tzLabel(id){
  const city=String(id||'').split('/').slice(1).join(' / ').replace(/_/g,' ')||id;
  const part=(typ)=>{try{const p=new Intl.DateTimeFormat('en-US',{timeZone:id,timeZoneName:typ}).formatToParts(new Date());return (p.find(x=>x.type==='timeZoneName')||{}).value||''}catch(e){return ''}};
  const long=part('long'), off=part('shortOffset');
  if(long&&off)return long+' · '+city+' ('+off+')';
  if(long)return long+' · '+city;
  if(off)return city+' ('+off+')';
  return String(id||'');
}
function fromCfg(){return (typeof NT!=='undefined'&&NT.cfg)||{}}
function countryList(){const c=fromCfg().countries;return (c&&c.length)?c:COUNTRIES}
function favList(){const f=fromCfg().favourites;return (f&&f.length)?f:FAVOURITES}
function regionsFor(cc){const r=(fromCfg().regions||REGIONS)[cc];return r||null}
function regionGroupsFor(cc){return (fromCfg().regionGroups||REGION_GROUPS)[cc]||null}
function countryTzFor(cc){return (fromCfg().countryTz||COUNTRY_TZ)[cc]||[]}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function countryOptions(sel){
  const cur=sel||'US',fav=favList(),all=countryList();
  const opt=([code,name])=>`<option value="${esc(code)}"${code===cur?' selected':''}>${esc(name)}</option>`;
  const favSet=new Set(fav);
  const favHtml=fav.map(code=>{const row=all.find(x=>x[0]===code)||[code,code];return opt(row)}).join('');
  const rest=all.filter(x=>!favSet.has(x[0])).slice().sort((a,b)=>a[1].localeCompare(b[1],'en'));
  return `<optgroup label="Frequently chosen">${favHtml}</optgroup><optgroup label="All countries">${rest.map(opt).join('')}</optgroup>`;
}
function regionField(country,selected){
  const cc=normalizeCountry(country||'US');
  const groups=regionGroupsFor(cc);
  const list=regionsFor(cc);
  const known=list||(groups?groups.flatMap(g=>g[1]):[]);
  const sel=(selected&&known.includes(selected))?selected:(cc==='US'?'Georgia':'');
  if(groups){
    const opts=groups.map(([label,items])=>`<optgroup label="${esc(label)}">${items.map(n=>`<option${n===sel?' selected':''}>${esc(n)}</option>`).join('')}</optgroup>`).join('');
    const title=cc==='GB'?'Nation or county':cc==='NG'?'State':cc==='CA'?'Province or territory':'State / Region';
    return `<label>${title}<select name="state" required><option value="">Select…</option>${opts}</select></label>`;
  }
  if(list){
    const title=cc==='US'?'State':cc==='NG'?'State':cc==='CA'?'Province or territory':'State / Region';
    return `<label>${title}<select name="state" required><option value="">Select…</option>${list.map(n=>`<option${n===sel?' selected':''}>${esc(n)}</option>`).join('')}</select></label>`;
  }
  return `<label>State / Region (optional)<input name="state" value="${esc(sel||'')}" maxlength="80" placeholder="State or region"></label>`;
}
function tzOptions(country,selected){
  const all=allTimeZones();
  const want=selected&&all.includes(selected)?selected:(all.includes(typeof myTz!=='undefined'?myTz:'')?myTz:null)||countryTzFor(country)[0]||'America/New_York';
  const suggest=countryTzFor(country).filter(z=>all.includes(z));
  const sugSet=new Set(suggest);
  const rest=all.filter(z=>!sugSet.has(z));
  const opt=z=>`<option value="${esc(z)}"${z===want?' selected':''}>${esc(tzLabel(z))}</option>`;
  const name=(countryList().find(x=>x[0]===country)||[])[1];
  const sugHtml=suggest.length?`<optgroup label="Suggested for ${esc(name||country)}">${suggest.map(opt).join('')}</optgroup>`:'';
  return sugHtml+`<optgroup label="All time zones">${rest.map(opt).join('')}</optgroup>`;
}
function pickDefaultCountry(tz){
  const z=tz||((typeof myTz!=='undefined')?myTz:'');
  try{return inferCountry(z)}catch(e){return 'US'}
}
function locFields(sel){
  const tz0=(sel&&sel.tz)||((typeof myTz!=='undefined')?myTz:'')||'America/New_York';
  const country=(sel&&sel.country)||pickDefaultCountry(tz0);
  const state=(sel&&sel.state)||'';
  return `<div class="row"><label>Country<select name="country">${countryOptions(country)}</select></label><span id="regWrap">${regionField(country,state)}</span></div><label>Time zone<select name="tz">${tzOptions(country,tz0)}</select></label>`;
}
function bindLoc(form,pref){
  if(!form||!form.country)return;
  const refresh=()=>{
    const c=form.country.value;
    const prev=form.state?form.state.value:'';
    const wrap=form.querySelector('#regWrap');
    if(wrap)wrap.innerHTML=regionField(c,prev);
    const tzSel=form.tz;
    if(tzSel){
      const keep=tzSel.value;
      const suggest=countryTzFor(c);
      const next=(keep&&(!suggest.length||suggest.includes(keep)||keep===((typeof myTz!=='undefined')?myTz:'')))?keep:(suggest[0]||keep);
      tzSel.innerHTML=tzOptions(c,next);
    }
  };
  form.country.addEventListener('change',refresh);
}
function placeOf(t){
  const cc=t.country||'US';
  const cname=t.countryName||countryName(cc);
  const bits=[];
  if(cc&&cc!=='US')bits.push(cname);
  if(t.state)bits.push(t.state);
  if(t.tzAbbr)bits.push(t.tzAbbr);
  return bits.join(' · ');
}
function tzFilterFits(t,f){
  if(!f)return true;
  const zone=t.tz||'',a=t.tzAbbr||'';
  const us={'America/New_York':'ET','America/Detroit':'ET','America/Kentucky/Louisville':'ET','America/Chicago':'CT','America/Denver':'MT','America/Boise':'MT','America/Phoenix':'MT','America/Los_Angeles':'PT'};
  if(us[zone]===f||a===f||String(a).startsWith(f))return true;
  const region=zone.split('/')[0];
  if(f==='Americas'||f==='America')return region==='America';
  return region===f||zone===f;
}

const NTGEO={COUNTRIES,FAVOURITES,REGIONS,REGION_GROUPS,COUNTRY_TZ,US_STATES,
  normalizeCountry,validCountry,countryName,validRegion,validTz,tzAbbr,inferCountry,suggestedTz,isUs,taxApplies,
  allTimeZones,tzLabel,countryOptions,regionField,tzOptions,locFields,bindLoc,placeOf,tzFilterFits,pickDefaultCountry};
if(typeof module!=='undefined'&&module.exports)module.exports=NTGEO;
if(typeof window!=='undefined')window.NTGEO=NTGEO;
