export const APP_TITLE = 'Fkake API';
export const APP_DESCRIPTION = 'The API as provided from this implementation flake';

export const API = 'api';
export const VERSION = 'v1';
export const OBJECT_TYPE_ROUTE = 'object-types';
export const OBJECT_TYPE_TITLE = 'Object Types';
export const OBJECT_TYPE_PARAMETER = 'objectType';
export const DEPTH_PARAMETER = 'depth';
export const INSTANCE_ID_PARAMETER = 'instanceId';
export const HISTORY_ROUTE = 'history';
export const LAST_SEEN_PARAMETER = 'lastSeen';
export const TYPE_PARAMETER = 'type';
export const PROPERTY_PARAMETER = 'property';
export const SCHEMA_ROUTE = 'schemas';
export const SCHEMA_ROUTE_TITLE = 'Schemas';
export const SCHEMA_UUID_PARAMETER = 'schema-uuid';

export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;

// ------------------ DEFAULT - OPTIONS ------------ //

export const PORT = 8080;
export const SERVER_ADDRESS = 'localhost';
export const SERVER_PROTOCOL = 'http';

// DERIVED
export const BASE_PATH = `${API}/${VERSION}`;
export const SERVER_URL = `${SERVER_PROTOCOL}://${SERVER_ADDRESS}:${PORT}`;
