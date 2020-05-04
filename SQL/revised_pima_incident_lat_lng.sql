-- run this CREATE TABLE query and then import data PRIOR TO running UPDATE queries below

CREATE TABLE "revised_incident_pima_lat_lng" (
    "incident_id" int   NOT NULL,
	"incident_lat" float   NOT NULL,
    "incident_lng" float   NOT NULL,
    CONSTRAINT "pk_revised_incident_pima_lat_lng" PRIMARY KEY (
        "incident_id"
     )
);

-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- IMPORT DATA file called "revised_pima_county_lat_lng.csv" into table created above
-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


-- run the following UPDATE queries in order (you can highlight them all and run)

-- create new columns in "migrant_incident_detail" table
ALTER TABLE migrant_incident_detail
ADD COLUMN rev_incident_lat FLOAT,
ADD COLUMN rev_incident_lNG FLOAT;


-- UPDATE "migrant_incident_detail" table
-- copy source lat-lng into revised lat-lng columns
UPDATE migrant_incident_detail
SET
rev_incident_lat = incident_lat,
rev_incident_lng = incident_lng;

-- set the revised lat-lng for Pima County
UPDATE migrant_incident_detail
SET
rev_incident_lat = revised_incident_pima_lat_lng.incident_lat,
rev_incident_lng = revised_incident_pima_lat_lng.incident_lng
FROM revised_incident_pima_lat_lng
WHERE
migrant_incident_detail.incident_id = revised_incident_pima_lat_lng.incident_id;

-- END OF QUERIES: use rev_incident_lat and rev_incident_lng to plot incidents