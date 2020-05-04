-- Lines 8-56 create the "migrant_incident_detail" table.
-- This table will contain the actual values (denormalized) from the columns in the "incident" table.
-- It also contains values from the "nearest_port" and "ports" tables.
-- The table can be used for plotting individual migrant incident locations.
-- It is the only table with incident lat-lngs and port lat-lngs.
-- Other tables contain port lat-lngs but not incident lat-lngs, because the incident data is aggregated.

CREATE TABLE "migrant_incident_detail" (
	"date_incident_concat" varchar(50) NOT NULL,
	"date_reported" date   NOT NULL,
	"year_reported" varchar(4) NULL,
	"year_month_reported" varchar(8) NULL,
	"year_qtr_reported" varchar(8) NULL,
    "incident_id" int   NOT NULL,
	"nearest_port_code" int   NOT NULL,
	"nearest_port_name" varchar(50)   NOT NULL,
    "nearest_port_state" varchar(15)   NOT NULL,
    "nearest_port_lat" float   NOT NULL,
    "nearest_port_lng" float   NOT NULL,
	"incident_lat" float   NOT NULL,
    "incident_lng" float   NOT NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
    "cause_of_death_code" int   NOT NULL,
	"cause_of_death" varchar(50)   NOT NULL,
    "cause_of_death_category" varchar(50)   NOT NULL,
    "location_code" int   NOT NULL,
	"location_desc" varchar(250)   NULL,
    "url_code" int   NOT NULL,
	"url_desc" varchar(250)   NULL,
    "source_quality_code" int   NOT NULL,
	"source_desc" varchar(250)   NOT NULL,
    CONSTRAINT "pk_migrant_incident_detail" PRIMARY KEY (
        "date_incident_concat"
     )
);

ALTER TABLE "migrant_incident_detail" ADD CONSTRAINT "fk_migrant_incident_detail_incident_id" FOREIGN KEY("incident_id")
REFERENCES "incidents" ("incident_id");

ALTER TABLE "migrant_incident_detail" ADD CONSTRAINT "fk_migrant_incident_detail_cause_of_death_code" FOREIGN KEY("cause_of_death_code")
REFERENCES "cause_of_death" ("primary_key");

ALTER TABLE "migrant_incident_detail" ADD CONSTRAINT "fk_migrant_incident_detail_location_code" FOREIGN KEY("location_code")
REFERENCES "location_description" ("primary_key");

ALTER TABLE "migrant_incident_detail" ADD CONSTRAINT "fk_migrant_incident_detail_url_code" FOREIGN KEY("url_code")
REFERENCES "url_description" ("primary_key");

ALTER TABLE "migrant_incident_detail" ADD CONSTRAINT "fk_migrant_incident_detail_source_quality_code" FOREIGN KEY("source_quality_code")
REFERENCES "source_quality" ("source_quality");

-- Lines 60-146 insert data into the "migrant_incident_detail" table

INSERT INTO migrant_incident_detail (
	date_incident_concat,
	date_reported,
	year_reported,
	year_month_reported,
	year_qtr_reported,
    incident_id,
	nearest_port_code,
	nearest_port_name,
    nearest_port_state,
    nearest_port_lat,
    nearest_port_lng,
	incident_lat,
    incident_lng,
    fatalities,
    missing,
	casualties,
    survivors,
    female_casualties,
    male_casualties,
    child_casualties,
    cause_of_death_code,
	cause_of_death,
    cause_of_death_category,
    location_code,
	location_desc,
    url_code,
	url_desc,
    source_quality_code,
	source_desc
)

SELECT
	CONCAT(i.date_reported, '|', i.incident_id) AS "date_incident_concat",
	i.date_reported,
	EXTRACT (YEAR FROM i.date_reported) AS "year_reported",
	CONCAT( EXTRACT (YEAR FROM i.date_reported) || '-' || EXTRACT (MONTH FROM i.date_reported)) AS "year_month_reported",
    CONCAT (EXTRACT (YEAR FROM i.date_reported) || '-' || EXTRACT (QUARTER FROM i.date_reported)) AS "year_qtr_reported",
	i.incident_id,
	np.nearest_port AS "nearest_port_code",
	p.port_name AS "nearest_port_name",
	p.state AS "nearest_port_state",
	p.lat AS "nearest_port_lat",
	p.lng AS "nearest_port_lng",
	i.lat AS "incident_lat",
	i.lng AS "incident_lng",
	i.fatalities,
	i.missing,
	i.fatalities + i.missing AS "casualties",
	i.survivors,
	i.females AS "female_casualties",
	i.males AS "male_casualties",
	i.children AS "child_casualties",
	i.cause_of_death_code,
	cod.cause_of_death,
    cod.cause_of_death_category,
    i.location_code,
	ld.location_desc,
    i.url_code,
	ud.url_desc,
    i.source_quality_code,
	sq.source_desc
	
FROM incidents i

LEFT JOIN nearest_port np
ON i.incident_id = np.incident_id

LEFT JOIN ports p
ON np.nearest_port = p.port_code

LEFT JOIN cause_of_death cod
ON i.cause_of_death_code = cod.primary_key

LEFT JOIN location_description ld
ON i.location_code = ld.primary_key

LEFT JOIN url_description ud
ON i.url_code = ud.primary_key

LEFT JOIN source_quality sq
ON i.source_quality_code = sq.source_quality

WHERE i.date_reported IS NOT NULL

ORDER BY nearest_port_code, date_reported
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 153-165 create the "crossings_wip" table.
-- This table is a copy of the "crossings" table with additional date fields (year, month, quarter) added.
-- It is used for populating crossing data perspectives necessary for summary tables storing aggregated crossing data.

CREATE TABLE "crossings_wip" (
	"primary_key" serial   NOT NULL,
    "port_code" int   NOT NULL,
    "date" date   NOT NULL,
    "measure_code" int   NOT NULL,
    "value" int   NOT NULL,
	"year_reported" varchar(4) NULL,
	"year_month_reported" varchar(8) NULL,
	"year_qtr_reported" varchar(8) NULL,
    CONSTRAINT "pk_crossings_wip" PRIMARY KEY (
        "primary_key"
     )
);

-- Lines 169-191 insert data into the crossings_wip table.

INSERT INTO crossings_wip (
	primary_key,
    port_code,
    date,
    measure_code,
    value,
	year_reported,
	year_month_reported,
	year_qtr_reported
)

SELECT
	c.primary_key,
    c.port_code,
    c.date,
    c.measure_code,
    c.value,
	EXTRACT (YEAR FROM c.date) AS "year_reported",
	CONCAT( EXTRACT (YEAR FROM c.date) || '-' || EXTRACT (MONTH FROM c.date)) AS "year_month_reported",
    CONCAT (EXTRACT (YEAR FROM c.date) || '-' || EXTRACT (QUARTER FROM c.date)) AS "year_qtr_reported"
	
FROM crossings c
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 198-218 create the "summary_incidents_by_port_month" table.
-- This table aggregates incident casualties and demos by nearest port and by year and month.
-- It also has nearest port information.

CREATE TABLE "summary_incidents_by_port_month" (
	"port_month_concat" varchar(50) NOT NULL,
	"nearest_port_code" int   NOT NULL,
	"nearest_port_name" varchar(50)   NOT NULL,
    "nearest_port_state" varchar(15)   NOT NULL,
    "nearest_port_lat" float   NOT NULL,
    "nearest_port_lng" float   NOT NULL,
	"year_reported" varchar(4) NULL,
	"year_month_reported" varchar(8) NULL,
	"year_qtr_reported" varchar(8) NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
	CONSTRAINT "pk_summary_incidents_by_port_month" PRIMARY KEY (
        "port_month_concat"
	)
);

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 223-274 insert data into the "summary_incidents_by_port_month" table.

INSERT INTO summary_incidents_by_port_month (
	port_month_concat,
	nearest_port_code,
	nearest_port_name,
    nearest_port_state,
    nearest_port_lat,
    nearest_port_lng,
	year_reported,
	year_month_reported,
	year_qtr_reported,
    fatalities,
    missing,
	casualties,
    survivors,
    female_casualties,
    male_casualties,
    child_casualties
)

SELECT
	concat(mi.nearest_port_code, '|', mi.year_month_reported) AS "port_month_concat",
	mi.nearest_port_code,
	mi.nearest_port_name,
    mi.nearest_port_state,
    mi.nearest_port_lat,
    mi.nearest_port_lng,
	mi.year_reported,
	mi.year_month_reported,
	mi.year_qtr_reported,
    SUM(mi.fatalities),
    SUM(mi.missing),
	SUM(mi.casualties),
    SUM(mi.survivors),
    SUM(mi.female_casualties),
    SUM(mi.male_casualties),
    SUM(mi.child_casualties)
	
FROM migrant_incident_detail  mi

GROUP BY
	mi.nearest_port_code,
	mi.nearest_port_name,
    mi.nearest_port_state,
    mi.nearest_port_lat,
    mi.nearest_port_lng,
	mi.year_reported,
	mi.year_month_reported,
	mi.year_qtr_reported
	
ORDER BY
	nearest_port_code, mi.year_month_reported ASC
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 282-316 create the "summary_crossings_by_port_month" table.
-- This table aggregates crossings and nearest incident casualties by port and by year and month.
-- The mode-of-crossing data (pedestrians, passengers, cars, etc) is flattened, meaning each mode has its own column.
-- Each row represents a specific year and month for a given port with crossings by mode and nearest migrant casualties to the port.

CREATE TABLE "summary_crossings_by_port_month" (
	"port_month_concat" varchar(50) NOT NULL,
	"port_code" int   NOT NULL,
	"port_name" varchar(50)   NOT NULL,
    "port_state" varchar(15)   NOT NULL,
    "port_lat" float   NOT NULL,
    "port_lng" float   NOT NULL,
	"year_reported" varchar(4) NULL,
	"year_month_reported" varchar(8) NULL,
	"year_qtr_reported" varchar(8) NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
	"pedestrian_x" float NULL,
	"passenger_x_bus" float NULL,
	"passenger_x_train" float NULL,
	"passenger_x_personal_vehicle" float NULL,
	"passenger_x_any" float NULL,
	"pedestrian_and_passenger_x" float NULL,
	"personal_vehicles" float NULL,
	"buses" float NULL,
	"trains" float NULL,
	"trucks" float NULL,
	"rail_containers_full" float NULL,
	"rail_containers_empty" float NULL,
	"truck_containers_full" float NULL,
	"truck_containers_empty" float NULL,
	CONSTRAINT "pk_summary_crossings_by_port_month" PRIMARY KEY (
        "port_month_concat"
	)
);

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 321-539 insert and update data into the "summary_crossings_by_port_month" table.

INSERT INTO summary_crossings_by_port_month (
	port_month_concat,
	port_code,
	port_name,
    port_state,
    port_lat,
    port_lng,
	year_reported,
	year_month_reported,
	year_qtr_reported
)

SELECT 
	concat(c.port_code, '|', c.year_month_reported) AS "port_month_concat",
	c.port_code,
	p.port_name,
    p.state AS "port_state",
    p.lat AS "port_lat",
    p.lng AS "port_lng",
	c.year_reported,
	c.year_month_reported,
    c.year_qtr_reported
	
FROM crossings_wip c

LEFT JOIN ports p
ON c.port_code = p.port_code

GROUP BY
	c.port_code,
	p.port_name,
    p.state,
    p.lat,
    p.lng,
	c.year_reported,
	c.year_month_reported,
	c.year_qtr_reported
	
ORDER BY
	c.port_code, c.year_month_reported ASC
;

-- update "summary_crossings_by_port_month" with crossing data aggregated by year and month

UPDATE summary_crossings_by_port_month
SET
pedestrian_x = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END

FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 13
;

UPDATE summary_crossings_by_port_month
SET
passenger_x_bus = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 11;

UPDATE summary_crossings_by_port_month
SET
passenger_x_train =
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 18;

UPDATE summary_crossings_by_port_month
SET
passenger_x_personal_vehicle =
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 14;

UPDATE summary_crossings_by_port_month
SET
personal_vehicles = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 15;

UPDATE summary_crossings_by_port_month
SET
buses = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 12;

UPDATE summary_crossings_by_port_month
SET
trains = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 19;

UPDATE summary_crossings_by_port_month
SET
trucks = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 22;

UPDATE summary_crossings_by_port_month
SET
rail_containers_full = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 17;

UPDATE summary_crossings_by_port_month
SET
rail_containers_empty = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 16;

UPDATE summary_crossings_by_port_month
SET
truck_containers_full = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 21;

UPDATE summary_crossings_by_port_month
SET
truck_containers_empty = 
	CASE WHEN crossings_wip.value >= 0 THEN crossings_wip.value
		 ELSE 0
	END
FROM crossings_wip
WHERE 
summary_crossings_by_port_month.port_code = crossings_wip.port_code AND
summary_crossings_by_port_month.year_month_reported = crossings_wip.year_month_reported AND
crossings_wip.measure_code = 20;

UPDATE summary_crossings_by_port_month 
SET
passenger_x_any = (COALESCE(passenger_x_bus, 0) + COALESCE(passenger_x_train, 0) + COALESCE(passenger_x_personal_vehicle, 0))
;

UPDATE summary_crossings_by_port_month 
SET
pedestrian_and_passenger_x = (COALESCE(pedestrian_x, 0) + COALESCE(passenger_x_any,0))
;

-- update "summary_crossings_by_port_month" with incident casualties data aggregated by year and month

UPDATE summary_crossings_by_port_month

SET
fatalities = summary_incidents_by_port_month.fatalities,
missing = summary_incidents_by_port_month.missing,
casualties = summary_incidents_by_port_month.casualties,
survivors = summary_incidents_by_port_month.survivors,
female_casualties = summary_incidents_by_port_month.female_casualties,
male_casualties = summary_incidents_by_port_month.male_casualties,
child_casualties = summary_incidents_by_port_month.child_casualties

FROM summary_incidents_by_port_month

WHERE 
summary_crossings_by_port_month.port_code = summary_incidents_by_port_month.nearest_port_code AND
summary_crossings_by_port_month.year_month_reported = summary_incidents_by_port_month.year_month_reported
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 546-565 create the "summary_incidents_by_port_quarter" table.
-- This table aggregates incident casualties and demos by nearest port and by year and quarter.
-- It also has nearest port information. It does not have crossings by mode data.

CREATE TABLE "summary_incidents_by_port_quarter" (
	"port_quarter_concat" varchar(50) NOT NULL,
	"nearest_port_code" int   NOT NULL,
	"nearest_port_name" varchar(50)   NOT NULL,
    "nearest_port_state" varchar(15)   NOT NULL,
    "nearest_port_lat" float   NOT NULL,
    "nearest_port_lng" float   NOT NULL,
	"year_reported" varchar(4) NULL,
	"year_qtr_reported" varchar(8) NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
	CONSTRAINT "pk_summary_incidents_by_port_quarter" PRIMARY KEY (
        "port_quarter_concat"
	)
);

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 570-618 insert data into the "summary_incidents_by_port_quarter" table.

INSERT INTO summary_incidents_by_port_quarter (
	port_quarter_concat,
	nearest_port_code,
	nearest_port_name,
    nearest_port_state,
    nearest_port_lat,
    nearest_port_lng,
	year_reported,
	year_qtr_reported,
    fatalities,
    missing,
	casualties,
    survivors,
    female_casualties,
    male_casualties,
    child_casualties
)

SELECT
	concat(mi.nearest_port_code, '|', mi.year_qtr_reported) AS "port_quarter_concat",
	mi.nearest_port_code,
	mi.nearest_port_name,
    mi.nearest_port_state,
    mi.nearest_port_lat,
    mi.nearest_port_lng,
	mi.year_reported,
	mi.year_qtr_reported,
    SUM(mi.fatalities),
    SUM(mi.missing),
	SUM(mi.casualties),
    SUM(mi.survivors),
    SUM(mi.female_casualties),
    SUM(mi.male_casualties),
    SUM(mi.child_casualties)
	
FROM migrant_incident_detail  mi

GROUP BY
	mi.nearest_port_code,
	mi.nearest_port_name,
    mi.nearest_port_state,
    mi.nearest_port_lat,
    mi.nearest_port_lng,
	mi.year_reported,
	mi.year_qtr_reported
	
ORDER BY
	nearest_port_code, mi.year_qtr_reported ASC
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 626-659 create the "summary_crossings_by_port_quarter" table.
-- This table aggregates crossings and nearest incident casualties by port and by year and quarter.
-- The mode-of-crossing data (pedestrians, passengers, cars, etc) is flattened, meaning each mode has its own column.
-- Each row represents a specific year and quarter for a given port with crossings by mode and nearest migrant casualties to the port.

CREATE TABLE "summary_crossings_by_port_quarter" (
	"port_quarter_concat" varchar(50) NOT NULL,
	"port_code" int   NOT NULL,
	"port_name" varchar(50)   NOT NULL,
    "port_state" varchar(15)   NOT NULL,
    "port_lat" float   NOT NULL,
    "port_lng" float   NOT NULL,
	"year_reported" varchar(4) NULL,
	"year_qtr_reported" varchar(8) NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
	"pedestrian_x" float NULL,
	"passenger_x_bus" float NULL,
	"passenger_x_train" float NULL,
	"passenger_x_personal_vehicle" float NULL,
	"passenger_x_any" float NULL,
	"pedestrian_and_passenger_x" float NULL,
	"personal_vehicles" float NULL,
	"buses" float NULL,
	"trains" float NULL,
	"trucks" float NULL,
	"rail_containers_full" float NULL,
	"rail_containers_empty" float NULL,
	"truck_containers_full" float NULL,
	"truck_containers_empty" float NULL,
	CONSTRAINT "pk_summary_crossings_by_port_quarter" PRIMARY KEY (
        "port_quarter_concat"
	)
);

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 664-740 insert data into the "summary_crossings_by_port_quarter" table.

INSERT INTO summary_crossings_by_port_quarter (
	port_quarter_concat,
	port_code,
	port_name,
    port_state,
    port_lat,
    port_lng,
	year_reported,
	year_qtr_reported,
	fatalities,
    missing,
	casualties,
    survivors,
    female_casualties,
    male_casualties,
    child_casualties,
	pedestrian_x,
	passenger_x_bus,
	passenger_x_train,
	passenger_x_personal_vehicle,
	passenger_x_any,
	pedestrian_and_passenger_x,
	personal_vehicles,
	buses,
	trains,
	trucks,
	rail_containers_full,
	rail_containers_empty,
	truck_containers_full,
	truck_containers_empty
)

SELECT 
	concat(cm.port_code, '|', cm.year_qtr_reported) AS "port_quarter_concat",
	cm.port_code,
	cm.port_name,
    cm.port_state,
    cm.port_lat,
    cm.port_lng,
	cm.year_reported,
    cm.year_qtr_reported,
	SUM(cm.fatalities),
    SUM(cm.missing),
	SUM(cm.casualties),
    SUM(cm.survivors),
    SUM(cm.female_casualties),
    SUM(cm.male_casualties),
    SUM(cm.child_casualties),
	SUM(cm.pedestrian_x),
	SUM(cm.passenger_x_bus),
	SUM(cm.passenger_x_train),
	SUM(cm.passenger_x_personal_vehicle),
	SUM(cm.passenger_x_any),
	SUM(cm.pedestrian_and_passenger_x),
	SUM(cm.personal_vehicles),
	SUM(cm.buses),
	SUM(cm.trains),
	SUM(cm.trucks),
	SUM(cm.rail_containers_full),
	SUM(cm.rail_containers_empty),
	SUM(cm.truck_containers_full),
	SUM(cm.truck_containers_empty)
	
FROM summary_crossings_by_port_month cm

GROUP BY
	cm.port_code,
	cm.port_name,
    cm.port_state,
    cm.port_lat,
    cm.port_lng,
	cm.year_reported,
	cm.year_qtr_reported
	
ORDER BY
	cm.port_code, cm.year_qtr_reported ASC
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 747-765 create the "summary_incidents_by_port_year" table.
-- This table aggregates incident casualties and demos by nearest port and by year.
-- It also has nearest port information. It does not have crossings by mode data.

CREATE TABLE "summary_incidents_by_port_year" (
	"port_year_concat" varchar(50) NOT NULL,
	"nearest_port_code" int   NOT NULL,
	"nearest_port_name" varchar(50)   NOT NULL,
    "nearest_port_state" varchar(15)   NOT NULL,
    "nearest_port_lat" float   NOT NULL,
    "nearest_port_lng" float   NOT NULL,
	"year_reported" varchar(4) NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
	CONSTRAINT "pk_summary_incidents_by_port_year" PRIMARY KEY (
        "port_year_concat"
	)
);

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 770-817 insert data into the "summary_incidents_by_port_year" table.

INSERT INTO summary_incidents_by_port_year (
	port_year_concat,
	nearest_port_code,
	nearest_port_name,
    nearest_port_state,
    nearest_port_lat,
    nearest_port_lng,
	year_reported,
    fatalities,
    missing,
	casualties,
    survivors,
    female_casualties,
    male_casualties,
    child_casualties
)

SELECT
	concat(mi.nearest_port_code, '|', mi.year_reported) AS "port_year_concat",
	mi.nearest_port_code,
	mi.nearest_port_name,
    mi.nearest_port_state,
    mi.nearest_port_lat,
    mi.nearest_port_lng,
	mi.year_reported,
    SUM(mi.fatalities),
    SUM(mi.missing),
	SUM(mi.casualties),
    SUM(mi.survivors),
    SUM(mi.female_casualties),
    SUM(mi.male_casualties),
    SUM(mi.child_casualties)
	
FROM migrant_incident_detail  mi

WHERE mi.year_reported IN ('2014', '2015', '2016', '2017', '2018')

GROUP BY
	mi.nearest_port_code,
	mi.nearest_port_name,
    mi.nearest_port_state,
    mi.nearest_port_lat,
    mi.nearest_port_lng,
	mi.year_reported
	
ORDER BY
	nearest_port_code, mi.year_reported ASC
;

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 825-857 create the "summary_crossings_by_port_year" table.
-- This table aggregates crossings and nearest incident casualties by port and by year.
-- The mode-of-crossing data (pedestrians, passengers, cars, etc) is flattened, meaning each mode has its own column.
-- Each row represents a specific year for a given port with crossings by mode and nearest migrant casualties to the port.

CREATE TABLE "summary_crossings_by_port_year" (
	"port_year_concat" varchar(50) NOT NULL,
	"port_code" int   NOT NULL,
	"port_name" varchar(50)   NOT NULL,
    "port_state" varchar(15)   NOT NULL,
    "port_lat" float   NOT NULL,
    "port_lng" float   NOT NULL,
	"year_reported" varchar(4) NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
	"casualties" float   NULL,
    "survivors" float   NULL,
    "female_casualties" float   NULL,
    "male_casualties" float   NULL,
    "child_casualties" float   NULL,
	"pedestrian_x" float NULL,
	"passenger_x_bus" float NULL,
	"passenger_x_train" float NULL,
	"passenger_x_personal_vehicle" float NULL,
	"passenger_x_any" float NULL,
	"pedestrian_and_passenger_x" float NULL,
	"personal_vehicles" float NULL,
	"buses" float NULL,
	"trains" float NULL,
	"trucks" float NULL,
	"rail_containers_full" float NULL,
	"rail_containers_empty" float NULL,
	"truck_containers_full" float NULL,
	"truck_containers_empty" float NULL,
	CONSTRAINT "pk_summary_crossings_by_port_year" PRIMARY KEY (
        "port_year_concat"
	)
);

-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Lines 862-937 insert data into the "summary_crossings_by_port_year" table.

INSERT INTO summary_crossings_by_port_year (
	port_year_concat,
	port_code,
	port_name,
    port_state,
    port_lat,
    port_lng,
	year_reported,
	fatalities,
    missing,
	casualties,
    survivors,
    female_casualties,
    male_casualties,
    child_casualties,
	pedestrian_x,
	passenger_x_bus,
	passenger_x_train,
	passenger_x_personal_vehicle,
	passenger_x_any,
	pedestrian_and_passenger_x,
	personal_vehicles,
	buses,
	trains,
	trucks,
	rail_containers_full,
	rail_containers_empty,
	truck_containers_full,
	truck_containers_empty
)

SELECT 
	concat(cm.port_code, '|', cm.year_reported) AS "port_year_concat",
	cm.port_code,
	cm.port_name,
    cm.port_state,
    cm.port_lat,
    cm.port_lng,
	cm.year_reported,
	SUM(cm.fatalities),
    SUM(cm.missing),
	SUM(cm.casualties),
    SUM(cm.survivors),
    SUM(cm.female_casualties),
    SUM(cm.male_casualties),
    SUM(cm.child_casualties),
	SUM(cm.pedestrian_x),
	SUM(cm.passenger_x_bus),
	SUM(cm.passenger_x_train),
	SUM(cm.passenger_x_personal_vehicle),
	SUM(cm.passenger_x_any),
	SUM(cm.pedestrian_and_passenger_x),
	SUM(cm.personal_vehicles),
	SUM(cm.buses),
	SUM(cm.trains),
	SUM(cm.trucks),
	SUM(cm.rail_containers_full),
	SUM(cm.rail_containers_empty),
	SUM(cm.truck_containers_full),
	SUM(cm.truck_containers_empty)
	
FROM summary_crossings_by_port_month cm

WHERE cm.year_reported IN ('2014', '2015', '2016', '2017', '2018')

GROUP BY
	cm.port_code,
	cm.port_name,
    cm.port_state,
    cm.port_lat,
    cm.port_lng,
	cm.year_reported
	
ORDER BY
	cm.port_code, cm.year_reported ASC
;