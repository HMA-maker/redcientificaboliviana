# Map decision

Phase 2 uses an offline, generalized department-level map rendered from approved records and `data/bolivia-departments.geojson`. The boundary file is the simplified public-domain Bolivia ADM1 dataset from geoBoundaries (source: GeoBolivia, 2015 representation). It does not call a map API, require credentials, transmit locations to a third party, or expose exact coordinates in the interface.

The overview provides layer-equivalent record-type colors, accessible marker buttons, a legend, and a list alternative. It is intentionally not a navigation map. Before adopting an interactive tile map, approve a boundary-data source and provider. MapLibre with OpenFreeMap remains the recommended future option; it requires attribution and has no SLA. Standard OSM tiles have attribution, caching, and usage-policy requirements.
