use flights_ticket_project;
insert into airports (airportsid,airport_name,country,city,adress)
VALUES ('SBH','Sabiha Gokcen Airport','Turkiye','Istanbul','Sanayi, 34906 Pendik/İstanbul'),
('ESB','Esenboga Airport','Turkiye','Ankara','Balıkhisar St., Ozal Avenue, Akyurt/Ankara'),
('JFK','John F. Kennedy Airport','USA','New York','Queens, New York 11430, USA'),
('ADB','Izmir Adnan Menderes Airport','Turkiye','Izmir','Dokuz Eylul, 35410 Gaziemir/Izmir'),
('EZS','Elazig Airport','Turkiye','Elazig','Yesilyurt St. Elazig Airport, Havalimani St., 23000 Akcakiraz/Elazig'),
('YEI','Bursa Yenisehir Airport','Turkiye','Bursa','Cardak, 16900 Yenisehir/Bursa'),
('RZV','Rize Artvin Airport','Turkiye','Rize','Rize-Artvin Airport, 53300 Pazar/Rize'),
('DIY','Diyarbakir Airport','Turkiye','Diyarbakir','Kamisli Avenue, 21090 Baglar/Diyarbakir'),
('BJV','Milas-Bodrum Airport','Turkiye','Mugla','Ekinanbari, Havalimanı St, 48200 Milas/Mugla'),
('AYT','Antalya Airport','Turkiye','Antalya','Yesilkoy, 07230 Muratpasa/Antalya'),
('SOF','Sofia Airport','Bulgaria','Sofia','1 Chistophor Columbus Blvd, Sofia Airport EAD, 1540 Sofia, Bulgaria'),
('BER','Berlin Brandenburg Airport','Germany','Berlin','Melli-Beese-Ring 1, 12529 Schönefeld, Germany'),
('ROM','Roma Airport','Italy','Roma','Via L.Da Vinci, 00015 Roma RM, İtaly'),
('CDG','Charles De Gaulle Airport','France','Paris','95700 Roissy-en-France, France'),
('NRT','Tokyo Airport','Japan','Tokyo','1-1 Furugome, Narita, Chiba 282-0004, Japan');
-------------------------------------------------------------------------------------------------------
select airport_name,airportsid from airports
