drop schema eHotel cascade;
CREATE schema eHotel;
SET search_path = eHotel;

/*
	It might be smart to make the hname the primary key, so the user doesn't need to know the chainid numbers by heart
*/
Create table HotelChain(
	hname varchar(20),
	offPhone integer not null,
	offAdd Varchar(40) not null,
	offEmail Varchar(20) not null,
	noHotels integer default 0,
	Primary key (hname)
);

create table Employee(
	eSIN integer,
	eName varchar(20) not null,
	eAddress varchar(40) not null,
	primary key (eSIN)
);

Create table Hotel (
	hotelID Serial Primary key,
	hname varchar(20),
	hPhone integer not null,
	rating integer not null,
	hEmail varchar(20) not null,
	noRooms integer not null,
	hAdd varchar(40) not null,
	hArea varchar(20) not null,
	managerID integer,
	Foreign key (hname) references HotelChain(hname),
	Foreign key (managerID) references Employee(eSIN),
	constraint rating check (rating >=1 and rating <=5), /* rating 1-5 */
	constraint noRooms check (noRooms >=0)
);

Create table Room(
	--roomID Serial Primary key,
	hotelID integer,
	roomNum integer,
	capacity integer not null,
	roomView varchar(20) not null,
	extendable boolean not null,
	price numeric(10,2), /* Maximum price of $999,999.99 */
	Primary key (hotelID, roomNum),
	Foreign Key (hotelID) references Hotel(hotelID),
	constraint price check (price <= 999999.99),
	constraint capacity check (capacity > 0)
);

Create table AmenityList(
	--roomID integer,
	hotelID integer,
	roomNum integer,
	amenity varchar(20) not null,
	primary key (hotelID,roomNum,amenity),
	foreign key (hotelID, roomNum) references Room(hotelID,roomNum)
);

Create table Customer(
	cSIN integer,
	cName varchar(20) not null,
	cAddress varchar(40) not null,
	cRegDate date default CURRENT_TIMESTAMP,
	primary key (cSIN)
);

create table Booking(
	bookingID Serial Primary key,
	hotelid integer not null,
	roomnum integer not null,
	/*roomID integer not null,*/
	cSIN integer not null,
	isRental boolean not null,
	inDate date not null,
	outDate date not null,
	Foreign key (hotelid,roomnum) references Room(hotelid,roomnum),
	Foreign key (cSIN) references Customer(cSIN)
);

create table RoleList(
	eSIN integer,
	erole varChar(20) not null,
	foreign key (eSIN) references Employee(eSIN)
);