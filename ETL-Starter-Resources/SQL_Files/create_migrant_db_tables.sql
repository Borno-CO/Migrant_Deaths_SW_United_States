

CREATE TABLE "crossings" (
    "primary_key" serial   NOT NULL,
    "port_code" int   NOT NULL,
    "date" date   NOT NULL,
    "measure_code" int   NOT NULL,
    "value" int   NOT NULL,
    CONSTRAINT "pk_crossings" PRIMARY KEY (
        "primary_key"
     )
);

CREATE TABLE "ports" (
    "port_code" int   NOT NULL,
    "port_name" varchar(50)   NOT NULL,
    "state" varchar(15)   NOT NULL,
    "lat" float   NOT NULL,
    "lng" float   NOT NULL,
    CONSTRAINT "pk_ports" PRIMARY KEY (
        "port_code"
     )
);

CREATE TABLE "measures" (
    "primary_key" serial   NOT NULL,
    "measure" varchar(30)   NOT NULL,
    CONSTRAINT "pk_measures" PRIMARY KEY (
        "primary_key"
     )
);

CREATE TABLE "nearest_port" (
    "primary_key" serial   NOT NULL,
    "incident_id" int   NOT NULL,
    "nearest_port" int   NOT NULL,
    CONSTRAINT "pk_nearest_port" PRIMARY KEY (
        "primary_key"
     )
);

CREATE TABLE "incidents" (
    "incident_id" int   NOT NULL,
    "date_reported" date   NOT NULL,
    "fatalities" float   NULL,
    "missing" float   NULL,
    "survivors" float   NULL,
    "females" float   NULL,
    "males" float   NULL,
    "children" float   NULL,
    "cause_of_death_code" int   NOT NULL,
    "location_code" int   NOT NULL,
    "lat" float   NOT NULL,
    "lng" float   NOT NULL,
    "url_code" int   NOT NULL,
    "source_quality_code" int   NOT NULL,
    CONSTRAINT "pk_incidents" PRIMARY KEY (
        "incident_id"
     )
);

CREATE TABLE "source_quality" (
    "source_quality" int   NOT NULL,
    "source_desc" varchar(250)   NOT NULL,
    CONSTRAINT "pk_source_quality" PRIMARY KEY (
        "source_quality"
     )
);

CREATE TABLE "cause_of_death" (
    "primary_key" serial   NOT NULL,
    "cause_of_death" varchar(50)   NOT NULL,
    "cause_of_death_category" varchar(50)   NOT NULL,
    CONSTRAINT "pk_cause_of_death" PRIMARY KEY (
        "primary_key"
     )
);

CREATE TABLE "location_description" (
    "primary_key" serial   NOT NULL,
    "location_desc" varchar(250)   NULL,
    CONSTRAINT "pk_location_description" PRIMARY KEY (
        "primary_key"
     )
);

CREATE TABLE "url_description" (
    "primary_key" serial   NOT NULL,
    "url_desc" varchar(250)   NULL,
    CONSTRAINT "pk_url_description" PRIMARY KEY (
        "primary_key"
     )
);

ALTER TABLE "crossings" ADD CONSTRAINT "fk_crossings_port_code" FOREIGN KEY("port_code")
REFERENCES "ports" ("port_code");

ALTER TABLE "crossings" ADD CONSTRAINT "fk_crossings_measure_code" FOREIGN KEY("measure_code")
REFERENCES "measures" ("primary_key");

ALTER TABLE "nearest_port" ADD CONSTRAINT "fk_nearest_port_incident_id" FOREIGN KEY("incident_id")
REFERENCES "incidents" ("incident_id");

ALTER TABLE "nearest_port" ADD CONSTRAINT "fk_nearest_port_nearest_port" FOREIGN KEY("nearest_port")
REFERENCES "ports" ("port_code");

ALTER TABLE "incidents" ADD CONSTRAINT "fk_incidents_cause_of_death_code" FOREIGN KEY("cause_of_death_code")
REFERENCES "cause_of_death" ("primary_key");

ALTER TABLE "incidents" ADD CONSTRAINT "fk_incidents_location_code" FOREIGN KEY("location_code")
REFERENCES "location_description" ("primary_key");

ALTER TABLE "incidents" ADD CONSTRAINT "fk_incidents_url_code" FOREIGN KEY("url_code")
REFERENCES "url_description" ("primary_key");

ALTER TABLE "incidents" ADD CONSTRAINT "fk_incidents_source_quality_code" FOREIGN KEY("source_quality_code")
REFERENCES "source_quality" ("source_quality");