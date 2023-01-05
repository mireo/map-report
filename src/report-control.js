const ihtml = `
	<div>
		<a href='https://www.mireo.com/compact-maps' target='_blank' rel='noreferrer' class='feedback-trigger'>{trigger}</a>
		<div class='issue-report'>
			<div class='header'>
				<div class='title'>{title}</div>
				<div class='close'>
					<span class='label'>{close_title}</span>
					<span class='icon'>&nbsp;&#x2716;</span>
				</div>
			</div>
			<div class='content'>
				<div class='sidebar'>
					<div class='menu'>
						<div class='title-wrapper main-title'>
							<div class='issue-title'>{menu_title}</div>
						</div>
						<div class='issue-categories'>
							<div class='issue-category' data-issue-category='road'>{cat_label_road}</div>
							<div class='issue-category' data-issue-category='place'>{cat_label_place}</div>
							<div class='issue-category' data-issue-category='other'>{cat_label_other}</div>
						</div>
					</div>
					<div data-issue-content='road' class='category-content'>
						<div class='title-wrapper'>
							<div class='back'>&#10094;</div>
							<div class='issue-title'>{road_title}</div>
						</div>
						<div class='issue-types'>
							<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-wrong-name'></input><label class='issue-label' for='mireo-issue-wrong-name'>{road_label_name}</label>
							<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-wrong-dir'></input><label class='issue-label' for='mireo-issue-wrong-dir'>{road_label_dir}</label>
							<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-road-closed'></input><label class='issue-label' for='mireo-issue-road-closed'>{road_label_closed}</label>
							<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-road-missing'></input><label class='issue-label' for='mireo-issue-road-missing'>{road_label_missing}</label>
						</div>
						<div class='description'>
							<textarea class='textarea' placeholder='{description}'></textarea>
						</div>
						<div class='issue-send'>
							<button>{send_report}</button>
						</div>
					</div>
					<div data-issue-content='place' class='category-content'>
						<div class='title-wrapper'>
							<div class='back'>&#10094;</div>
							<div class='issue-title'>{place_title}</div>
						</div>
						<div class='issue-types'>
							<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-place-missing'></input><label class='issue-label' for='mireo-issue-place-missing'>{place_label_missing}</label>
							<input class='issue-type' type='radio' name='mireo-issue' id='mireo-issue-place-info-wrong'></input><label class='issue-label' for='mireo-issue-place-info-wrong'>{place_label_wrong_info}</label>
						</div>
						<div class='description'>
							<textarea class='textarea' placeholder='{description}'></textarea>
						</div>
						<div class='issue-send'>
							<button>{send_report}</button>
						</div>
					</div>
					<div data-issue-content='other' class='category-content'>
						<div class='title-wrapper'>
							<div class='back'>&#10094;</div>
							<div class='issue-title'>{other_title}</div>
						</div>
						<div class='issue-types'>
								<input class='issue-type' type='radio' name='mireo-issue' id='mireo-generic-issue' checked></input>
							</div>
						<div class='description'>
							<textarea class='textarea' placeholder='{description}'></textarea>
						</div>
						<div class='issue-send'>
							<button>{send_report}</button>
						</div>
					</div>
				</div>
				<div class='map-sidebar'>
					<div id='mireo-issue-map' data-mireo-issue-map='1' class='mireo-issue-map mapboxgl-map'></div>
				</div>
			</div>
		<div class='confirmation'>
			<div class="message-succ">{confirmation_succ}</div>
			<div class="message-err">{confirmation_err}</div>
			<div class='confirmation-back'>
				<button>{confirmation_back}</button>
			</div>
		</div
	</div>
`;

const road_layers = [
	'roads_1005', 'roads_1007', 'roads_1010', 'roads_1020', 'roads_1030', 'roads_1040', 'roads_1050', 'roads_1060', 'roads_1070', 'roads_1080',
	'roads_1016', 'roads_1026', 'roads_1036', 'roads_1046', 'roads_1056', 'roads_1066', 'roads_1076', 'roads_1086',
	'roads_1018', 'roads_1028', 'roads_1038', 'roads_1048', 'roads_1058', 'roads_1068', 'roads_1078', 'roads_1088'
];
import locales from './locales';
import mapboxgl from 'mapbox-gl';

function MapReport(opts = {}) {
	this._map  = null;
	this._rmap = null;
	this._container = null;
	this._marker = null;
	this._category = null;
	this._locale = opts.locale;
	this._referer = opts.referer;
	this._bnds = opts.bounds === null ? null : [[13.45, 42.37], [19.47, 46.57]];
	this._service = opts.service;
};

MapReport.prototype.onAdd = function(map) {
	this._map  = map;
	this._container = document.createElement('div');
	this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-attrib mireo-issue-report';
	const loc = locales[this._locale] || locales['hr'];
	this._container.innerHTML = ihtml.replace(/\{([\w]+)\}/gm,  (m, p) => loc[p] );

	this.init();

	this._map.on('moveend', () => {
		if(!this._rmap) return;
		this._rmap.flyTo({
			center: this._map.getCenter(),
			zoom: this._map.getZoom(),
			speed: 0.8
		});
	});

	this._container.querySelectorAll('.issue-category').forEach( el => {
		el.addEventListener('click', (e) => {
			this._select_category(e);
		});
	});

	this._container.querySelectorAll('.issue-type').forEach( el => {
		el.addEventListener('click', () => { 
			this._container.querySelector(`[data-issue-content = "${this._category}"] textarea`).value = '';
			this._highlight_road();
		});
	});

	this._container.querySelector('.close').addEventListener( 'click', () => this._hide());

	this._container.querySelectorAll('.title-wrapper').forEach( el => {
		el.addEventListener('click', () => {
			this._back();
		});
	});

	this._container.querySelector('.back').style.display = 'flex';
	this._container.querySelectorAll('.issue-send').forEach( btn => {
		btn.addEventListener('click', (e) => {
			this._send_issue(e);
		});
	});

	this._container.querySelector('.confirmation-back').addEventListener('click', () => {
		this._back_to_start();
	});
	return this._container;
};

MapReport.prototype.init = function() {
	this._container.querySelector('.feedback-trigger').addEventListener('click', (e) => {
		const map = this._map;
		const {lat, lng} = map.getCenter();
		const bnds = this._bnds ? new mapboxgl.LngLatBounds(this._bnds) : null;

		if (this._service && bnds && (lat < bnds.getNorth() && lat > bnds.getSouth()) && (lng > bnds.getWest() && lng < bnds.getEast()) ) {
			this._show();
		 	return e.preventDefault();
		}
		e.currentTarget.setAttribute('href', ['https://www.openstreetmap.org#map=' + map.getZoom(), lat, lng].join('/'));
	});
};

MapReport.prototype.onRemove = function(map) {
	this._container.parentNode.removeChild(this._container);
	this._map  = undefined;
};

MapReport.prototype._show = function() {
	if (!this._map.style || !this._map.style.stylesheet) return;

	const el = this._container.querySelector('.issue-report');
	el.style.display = 'flex';

	if (!this._rmap) {
		this._rmap = new mapboxgl.Map({
			container: this._container.querySelector('[data-mireo-issue-map]'),
			style: this._map.style.stylesheet,
			attributionControl: false,
			center: this._map.getCenter(),
			zoom: this._map.getZoom()
		});

		this._rmap.on('load', function() {
			this.addSource('report-road', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: []
				}
			});
			this.addLayer({
				id: 'report-road',
				type: 'line',
				source: 'report-road',
				layout: {
					'line-join': 'round',
					'line-cap': 'round'
				},
	 			paint: {
					'line-color': 'orangered',
					'line-width': 4
				}
			}, 'roadsOnewayArrowL');
		});
	}

	if (this._marker) {
		this._marker.setLngLat(this._map.getCenter());
		return;
	}

	this._marker = new mapboxgl.Marker({
			draggable: true,
			color: 'orange'
		})
		.setLngLat(this._map.getCenter())
		.addTo(this._rmap);

	this._rmap.on('click', (e) => {
		this._marker.setLngLat(e.lngLat);
		this._highlight_road();
	});

	this._marker.on('dragend', () => {
		this._highlight_road();
	});
};

MapReport.prototype._hide = function() {
	this._container.querySelector('.issue-report').style.display = 'none';
	this._back_to_start();
};

MapReport.prototype._set_road_data = function(f) { 
	this._rmap.getSource('report-road').setData({
		type: 'FeatureCollection',
		features: f 
	});
};

MapReport.prototype._highlight_road = function() { 
	if (this._container.querySelectorAll('[data-issue-content = "road"] input:checked:not(#mireo-issue-road-missing)').length === 0) {
		this._set_road_data([]);
		return;
	}
	const features = this._rmap.queryRenderedFeatures(this._rmap.project(this._marker.getLngLat()), {layers: road_layers});
	this._set_road_data([features[0] || []]);
};

MapReport.prototype._select_category = function(e) {
	this._category = e.currentTarget.getAttribute('data-issue-category');

	this._container.querySelector('.menu').style.display = 'none';
	
	this._container.querySelectorAll('.category-content').forEach( c  => c.style.display = 'none');
	this._container.querySelector(`[data-issue-content = "${this._category}"]`).style.display = 'flex';
	
	this._container.querySelector(`[data-issue-content = "${this._category}"] .issue-type:first-child`).click();
};

MapReport.prototype._back = function() {
	this._container.querySelectorAll('.category-content').forEach( el => el.style.display = 'none');
	this._container.querySelector('.menu').style.display = 'flex';
	this._set_road_data([]);
};

MapReport.prototype._back_to_start = function() {
	this._container.querySelector('.issue-report').classList.remove('report-sent');
	this._container.querySelector('.content').style.display = 'flex';
	this._back();
};

MapReport.prototype._send_issue = function() {
	const ikind = this._container.querySelector('input.issue-type:checked').id;
	const description = this._container.querySelector(`[data-issue-content = "${this._category}"] textarea`).value;
	
	const resp = fetch(this._service, {
		method: 'POST',
		mode: 'no-cors',
		body: `(${this._marker._lngLat.lng} ${this._marker._lngLat.lat}) ${ikind} ${description} ${this._referer || window.location.href}`
	}).then(response => {
		this._container.querySelector('.issue-report .confirmation').className = 'confirmation confirmation-succ';
	})
	.catch(() => {
		this._container.querySelector('.issue-report .confirmation').className = 'confirmation confirmation-err';
	})
	.finally(() => {
		this._container.querySelector('.issue-report').classList.add('report-sent');
	});
};

export default MapReport;
