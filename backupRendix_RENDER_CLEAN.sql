--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-16 01:20:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
-- -- SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 861 (class 1247 OID 90026)
-- Name: enum_CashBoxes_shift; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_CashBoxes_shift" AS ENUM (
    'morning',
    'afternoon'
);


-- ALTER TYPE public."enum_CashBoxes_shift" OWNER TO postgres;

--
-- TOC entry 906 (class 1247 OID 82882)
-- Name: enum_CashBoxes_turno; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_CashBoxes_turno" AS ENUM (
    'morning',
    'afternoon'
);


-- ALTER TYPE public."enum_CashBoxes_turno" OWNER TO postgres;

--
-- TOC entry 873 (class 1247 OID 90063)
-- Name: enum_Movements_movementType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Movements_movementType" AS ENUM (
    'income',
    'expense'
);


-- ALTER TYPE public."enum_Movements_movementType" OWNER TO postgres;

--
-- TOC entry 903 (class 1247 OID 82726)
-- Name: enum_Sheets_shift; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Sheets_shift" AS ENUM (
    'morning',
    'afternoon'
);


-- ALTER TYPE public."enum_Sheets_shift" OWNER TO postgres;

--
-- TOC entry 885 (class 1247 OID 90098)
-- Name: enum_Transfers_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Transfers_status" AS ENUM (
    'pending',
    'review',
    'approved',
    'rejected'
);


-- ALTER TYPE public."enum_Transfers_status" OWNER TO postgres;

--
-- TOC entry 891 (class 1247 OID 90118)
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'salesman',
    'cashier',
    'admin'
);


-- ALTER TYPE public."enum_Users_role" OWNER TO postgres;

--
-- TOC entry 894 (class 1247 OID 90126)
-- Name: enum_Users_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_status" AS ENUM (
    'active',
    'inactive'
);


-- ALTER TYPE public."enum_Users_status" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 90032)
-- Name: CashBoxes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CashBoxes" (
    id integer NOT NULL,
    shift public."enum_CashBoxes_shift" NOT NULL,
    "totalCash" numeric(15,2),
    sale numeric(15,2),
    "sheetId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."CashBoxes" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 90031)
-- Name: CashBoxes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CashBoxes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."CashBoxes_id_seq" OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 217
-- Name: CashBoxes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CashBoxes_id_seq" OWNED BY public."CashBoxes".id;


--
-- TOC entry 220 (class 1259 OID 90039)
-- Name: CashDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CashDetails" (
    id integer NOT NULL,
    "cashboxId" integer NOT NULL,
    ten integer DEFAULT 0,
    twenty integer DEFAULT 0,
    fifty integer DEFAULT 0,
    hundred integer DEFAULT 0,
    "twoHundred" integer DEFAULT 0,
    "fiveHundred" integer DEFAULT 0,
    thousand integer DEFAULT 0,
    "twoThousand" integer DEFAULT 0,
    "tenThousand" integer DEFAULT 0,
    "twentyThousand" integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."CashDetails" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 90038)
-- Name: CashDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CashDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."CashDetails_id_seq" OWNER TO postgres;

--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 219
-- Name: CashDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CashDetails_id_seq" OWNED BY public."CashDetails".id;


--
-- TOC entry 222 (class 1259 OID 90056)
-- Name: Companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Companies" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "superAdminId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."Companies" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 90055)
-- Name: Companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Companies_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."Companies_id_seq" OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 221
-- Name: Companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Companies_id_seq" OWNED BY public."Companies".id;


--
-- TOC entry 224 (class 1259 OID 90068)
-- Name: Movements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Movements" (
    id integer NOT NULL,
    concept character varying(255) NOT NULL,
    amount numeric(15,2) NOT NULL,
    "movementType" public."enum_Movements_movementType" NOT NULL,
    "conceptType" character varying(255) NOT NULL,
    "esDetalleEfectivo" boolean DEFAULT false NOT NULL,
    "cashboxId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."Movements" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 90067)
-- Name: Movements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Movements_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."Movements_id_seq" OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 223
-- Name: Movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Movements_id_seq" OWNED BY public."Movements".id;


--
-- TOC entry 226 (class 1259 OID 90078)
-- Name: Sheets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sheets" (
    id integer NOT NULL,
    date date NOT NULL,
    "totalSheet" numeric(15,2) DEFAULT 0 NOT NULL,
    "totalSistema" numeric(15,2) DEFAULT 0 NOT NULL,
    "companyId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sheetId" integer
);


-- ALTER TABLE public."Sheets" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 90077)
-- Name: Sheets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Sheets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."Sheets_id_seq" OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 225
-- Name: Sheets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Sheets_id_seq" OWNED BY public."Sheets".id;


--
-- TOC entry 228 (class 1259 OID 90087)
-- Name: SuperAdmins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SuperAdmins" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."SuperAdmins" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 90086)
-- Name: SuperAdmins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SuperAdmins_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."SuperAdmins_id_seq" OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 227
-- Name: SuperAdmins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SuperAdmins_id_seq" OWNED BY public."SuperAdmins".id;


--
-- TOC entry 230 (class 1259 OID 90108)
-- Name: Transfers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transfers" (
    id integer NOT NULL,
    "numberOperation" integer NOT NULL,
    salesman character varying(255) NOT NULL,
    "clientNumber" integer NOT NULL,
    "clientName" character varying(255) NOT NULL,
    "dateTransfer" date NOT NULL,
    "dateOfLoading" date NOT NULL,
    amount numeric(15,2) NOT NULL,
    "originBank" character varying(255) NOT NULL,
    "destinationBank" character varying(255) NOT NULL,
    "receiptImage" character varying(255),
    status public."enum_Transfers_status" DEFAULT 'pending'::public."enum_Transfers_status" NOT NULL,
    "cashboxId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."Transfers" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 90107)
-- Name: Transfers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transfers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER SEQUENCE public."Transfers_id_seq" OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 229
-- Name: Transfers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transfers_id_seq" OWNED BY public."Transfers".id;


--
-- TOC entry 232 (class 1259 OID 90138)
-- Name: UserTransfers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserTransfers" (
    "userId" integer NOT NULL,
    "transferId" integer NOT NULL
);


-- ALTER TABLE public."UserTransfers" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 90131)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    role public."enum_Users_role" NOT NULL,
    password character varying(255) NOT NULL,
    status public."enum_Users_status" NOT NULL,
    "companyId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


-- ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 4754 (class 2604 OID 90035)
-- Name: CashBoxes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CashBoxes" ALTER COLUMN id SET DEFAULT nextval('public."CashBoxes_id_seq"'::regclass);


--
-- TOC entry 4755 (class 2604 OID 90042)
-- Name: CashDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CashDetails" ALTER COLUMN id SET DEFAULT nextval('public."CashDetails_id_seq"'::regclass);


--
-- TOC entry 4766 (class 2604 OID 90059)
-- Name: Companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Companies" ALTER COLUMN id SET DEFAULT nextval('public."Companies_id_seq"'::regclass);


--
-- TOC entry 4767 (class 2604 OID 90071)
-- Name: Movements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Movements" ALTER COLUMN id SET DEFAULT nextval('public."Movements_id_seq"'::regclass);


--
-- TOC entry 4769 (class 2604 OID 90081)
-- Name: Sheets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sheets" ALTER COLUMN id SET DEFAULT nextval('public."Sheets_id_seq"'::regclass);


--
-- TOC entry 4772 (class 2604 OID 90090)
-- Name: SuperAdmins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SuperAdmins" ALTER COLUMN id SET DEFAULT nextval('public."SuperAdmins_id_seq"'::regclass);


--
-- TOC entry 4773 (class 2604 OID 90111)
-- Name: Transfers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transfers" ALTER COLUMN id SET DEFAULT nextval('public."Transfers_id_seq"'::regclass);


--
-- TOC entry 5045 (class 0 OID 90032)
-- Dependencies: 218
-- Data for Name: CashBoxes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5047 (class 0 OID 90039)
-- Dependencies: 220
-- Data for Name: CashDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5049 (class 0 OID 90056)
-- Dependencies: 222
-- Data for Name: Companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Companies" VALUES (1, 'Mondello', 1, '2025-06-08 21:27:23.103-03', '2025-06-08 21:27:23.103-03');
INSERT INTO public."Companies" VALUES (2, 'La Vincenza', 1, '2025-06-08 21:27:35.62-03', '2025-06-08 21:27:35.62-03');


--
-- TOC entry 5051 (class 0 OID 90068)
-- Dependencies: 224
-- Data for Name: Movements; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5053 (class 0 OID 90078)
-- Dependencies: 226
-- Data for Name: Sheets; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5055 (class 0 OID 90087)
-- Dependencies: 228
-- Data for Name: SuperAdmins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."SuperAdmins" VALUES (1, 'fgarciamatar@gmail.com', '$2b$10$60kkdLgvK7GvbnavDqzva.7d91gxh4nBF1L6qHtW5W48mxStiUDSW', '2025-06-08 21:26:56.724-03', '2025-06-08 21:27:02.63-03');


--
-- TOC entry 5057 (class 0 OID 90108)
-- Dependencies: 230
-- Data for Name: Transfers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Transfers" VALUES (68, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:11:36.607-03', '2025-06-14 21:40:56.695-03');
INSERT INTO public."Transfers" VALUES (61, 2222, 'Jony', 54646, 'RUDDYS', '2025-06-06', '2025-06-14', 2321.00, 'Brubank', 'Banco Nación', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749940218/transfers/receipt-1749940214086.jpg', 'approved', NULL, '2025-06-14 19:30:15.765-03', '2025-06-14 20:24:04.113-03');
INSERT INTO public."Transfers" VALUES (60, 2342, 'Jony', 54646, 'Russo', '2025-06-05', '2025-06-14', 84588.00, 'Ualá', 'Mercado Pago', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749939983/transfers/receipt-1749939979391.jpg', 'approved', NULL, '2025-06-14 19:26:21.499-03', '2025-06-14 20:24:04.903-03');
INSERT INTO public."Transfers" VALUES (59, 333, 'Jony', 546463, 'Russo', '2025-06-13', '2025-06-14', 333.00, 'Ualá', 'Mercado Pago', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749939343/transfers/receipt-1749939339546.jpg', 'approved', NULL, '2025-06-14 19:15:41.406-03', '2025-06-14 20:53:54.186-03');
INSERT INTO public."Transfers" VALUES (58, 2342, 'Jony', 54646, 'Perlitas', '2025-06-14', '2025-06-14', 5688.00, 'Personal Pay', 'Mercado Pago', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749938438/transfers/receipt-1749938434260.png', 'approved', NULL, '2025-06-14 19:00:35.481-03', '2025-06-14 20:54:07.841-03');
INSERT INTO public."Transfers" VALUES (81, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:00:19.427-03', '2025-06-14 22:01:40.951-03');
INSERT INTO public."Transfers" VALUES (62, 2342, 'Massi', 54646, 'Russo', '2025-06-11', '2025-06-14', 4848.00, 'Personal Pay', 'Mercado Pago', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749945350/transfers/receipt-1749945346189.jpg', 'approved', NULL, '2025-06-14 20:55:47.604-03', '2025-06-14 20:57:46.36-03');
INSERT INTO public."Transfers" VALUES (71, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:41:41.007-03', '2025-06-14 21:42:58.844-03');
INSERT INTO public."Transfers" VALUES (63, 2342, 'Massi', 54646, 'RUDDYS', '2025-06-12', '2025-06-14', 34543.00, 'Brubank', 'Banco Nación', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749945524/transfers/receipt-1749945520646.jpg', 'rejected', NULL, '2025-06-14 20:58:42.294-03', '2025-06-14 21:04:02.477-03');
INSERT INTO public."Transfers" VALUES (70, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'rejected', NULL, '2025-06-14 21:41:40.888-03', '2025-06-14 21:43:00.399-03');
INSERT INTO public."Transfers" VALUES (77, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'rejected', NULL, '2025-06-14 21:46:12.124-03', '2025-06-14 22:02:34.886-03');
INSERT INTO public."Transfers" VALUES (64, 2342, 'Massi', 54646, 'RUDDYS', '2025-06-06', '2025-06-15', 555.00, 'Brubank', 'Banco Nación', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749946048/transfers/receipt-1749946044502.jpg', 'approved', NULL, '2025-06-14 21:07:26.003-03', '2025-06-14 21:08:33.797-03');
INSERT INTO public."Transfers" VALUES (66, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:08:18.584-03', '2025-06-14 21:10:08.684-03');
INSERT INTO public."Transfers" VALUES (72, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:41:41.253-03', '2025-06-14 21:43:28.83-03');
INSERT INTO public."Transfers" VALUES (65, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:08:16.97-03', '2025-06-14 21:11:29.973-03');
INSERT INTO public."Transfers" VALUES (73, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'rejected', NULL, '2025-06-14 21:41:41.413-03', '2025-06-14 21:43:40.476-03');
INSERT INTO public."Transfers" VALUES (67, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:11:35.985-03', '2025-06-14 21:13:00.699-03');
INSERT INTO public."Transfers" VALUES (82, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:00:19.574-03', '2025-06-14 22:02:39.496-03');
INSERT INTO public."Transfers" VALUES (74, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:41:41.558-03', '2025-06-14 21:44:55.708-03');
INSERT INTO public."Transfers" VALUES (69, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:11:36.833-03', '2025-06-14 21:40:22.14-03');
INSERT INTO public."Transfers" VALUES (84, 2342, 'Massi', 54646, 'Perlitas', '2025-06-13', '2025-06-15', 55550.00, 'Ualá', 'Banco Nación', 'https://res.cloudinary.com/du2c8tdir/image/upload/v1749949274/transfers/receipt-1749949270330.jpg', 'approved', NULL, '2025-06-14 22:01:12.15-03', '2025-06-14 22:02:43.2-03');
INSERT INTO public."Transfers" VALUES (83, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:00:25.42-03', '2025-06-14 22:03:50.45-03');
INSERT INTO public."Transfers" VALUES (88, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:05:24.263-03', '2025-06-14 22:11:12.275-03');
INSERT INTO public."Transfers" VALUES (76, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:45:29.196-03', '2025-06-14 21:50:32.438-03');
INSERT INTO public."Transfers" VALUES (75, 123456, 'Massi', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'rejected', NULL, '2025-06-14 21:45:08.197-03', '2025-06-14 21:50:34.163-03');
INSERT INTO public."Transfers" VALUES (79, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:50:45.423-03', '2025-06-14 22:00:08.76-03');
INSERT INTO public."Transfers" VALUES (80, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:50:45.844-03', '2025-06-14 22:00:14.872-03');
INSERT INTO public."Transfers" VALUES (78, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 21:50:45.229-03', '2025-06-14 22:00:32.658-03');
INSERT INTO public."Transfers" VALUES (86, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:05:24.016-03', '2025-06-14 22:12:10.121-03');
INSERT INTO public."Transfers" VALUES (87, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:05:24.128-03', '2025-06-14 22:05:40.611-03');
INSERT INTO public."Transfers" VALUES (85, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:05:23.858-03', '2025-06-14 22:13:01.119-03');
INSERT INTO public."Transfers" VALUES (91, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:11:01.763-03', '2025-06-14 22:13:03.891-03');
INSERT INTO public."Transfers" VALUES (90, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:06:52.941-03', '2025-06-14 22:08:04.064-03');
INSERT INTO public."Transfers" VALUES (89, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:05:24.386-03', '2025-06-14 22:08:05.329-03');
INSERT INTO public."Transfers" VALUES (92, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'approved', NULL, '2025-06-14 22:31:11.208-03', '2025-06-14 22:32:08.502-03');
INSERT INTO public."Transfers" VALUES (93, 123456, 'Marcelo', 4146, 'Ituarte Manuel', '2025-06-08', '2025-06-05', 1000.00, 'Banco Nación', 'Banco Nacion', NULL, 'pending', NULL, '2025-06-15 00:22:35.48-03', '2025-06-15 00:22:35.48-03');


--
-- TOC entry 5059 (class 0 OID 90138)
-- Dependencies: 232
-- Data for Name: UserTransfers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5058 (class 0 OID 90131)
-- Dependencies: 231
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" VALUES (44190656, 'Soledad', 'Tralice', 'salesman', '$2b$10$0LfyVM0wePHPAJBSJZqecelMp7KLJnwxu43Dz5R.k2zuImaIi/Oge', 'active', 1, '2025-06-08 21:30:31.462-03', '2025-06-08 21:30:31.462-03');
INSERT INTO public."Users" VALUES (44190653, 'Marcelo', 'Geromini', 'salesman', '$2b$10$h3XVEXRracvpz8LMOvy5ce6.IQhg3aLH991hgznuHD0Iqr2aSoTqS', 'active', 1, '2025-06-08 21:29:17.508-03', '2025-06-15 00:22:35.56-03');
INSERT INTO public."Users" VALUES (44190651, 'Miguel', 'Vargas', 'salesman', '$2b$10$xJPlJ3mYsKSu0lszQ2Ihcu1ocWJXbE3s7wc5gFz4ufxavFYZ0UJFC', 'active', 1, '2025-06-08 21:28:17.546-03', '2025-06-12 00:24:09.321-03');
INSERT INTO public."Users" VALUES (44190652, 'Jony', 'Vargas', 'salesman', '$2b$10$g1/t9Ze/wIUTm7N6.Hwz3Of0HNkKSfEg421NlrgLQ4TJ1Nrv1M7Ou', 'active', 1, '2025-06-08 21:28:56.277-03', '2025-06-14 19:30:15.776-03');
INSERT INTO public."Users" VALUES (44190655, 'Javier', 'Cardenas', 'salesman', '$2b$10$Zb1dtv/l6oh9KV5ZERzJP.5Z5mxVT/Pj.pVoDrgQbWuEKKsO9AvR6', 'active', 1, '2025-06-08 21:30:14.548-03', '2025-06-08 22:53:20.102-03');
INSERT INTO public."Users" VALUES (44190654, 'Andres', 'Lopez', 'salesman', '$2b$10$enxSVxm4Tj.YXlCKI2LpMuzHm/e2fOlJGi1g/FNnH0mDjlYaW7nnG', 'active', 1, '2025-06-08 21:29:34.08-03', '2025-06-08 22:57:28.49-03');
INSERT INTO public."Users" VALUES (44190650, 'Massi', 'Tralice', 'admin', '$2b$10$ZoO1DworI3/T8VQc/gy5HOqeYDAkgLD3ClLnT4MzoN.EicEpnnBxS', 'active', 1, '2025-06-08 21:28:01.996-03', '2025-06-14 22:01:12.198-03');


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 217
-- Name: CashBoxes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CashBoxes_id_seq"', 1, false);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 219
-- Name: CashDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CashDetails_id_seq"', 1, false);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 221
-- Name: Companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Companies_id_seq"', 2, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 223
-- Name: Movements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Movements_id_seq"', 1, false);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 225
-- Name: Sheets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Sheets_id_seq"', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 227
-- Name: SuperAdmins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SuperAdmins_id_seq"', 1, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 229
-- Name: Transfers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transfers_id_seq"', 93, true);


-- Completed on 2025-06-16 01:20:36

--
-- PostgreSQL database dump complete
--

