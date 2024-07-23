! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.JitsiMeetExternalAPI = t() : e.JitsiMeetExternalAPI = t()
}(self, (() => (() => {
	var e = {
			372: (e, t, n) => {
				"use strict";
				n.d(t, {
					default: () => D
				});
				var r = n(620),
					i = n.n(r);
				class s extends r {
					constructor() {
						var e, t, n;
						super(...arguments), e = this, n = {}, (t = function(e) {
							var t = function(e, t) {
								if ("object" != typeof e || null === e) return e;
								var n = e[Symbol.toPrimitive];
								if (void 0 !== n) {
									var r = n.call(e, "string");
									if ("object" != typeof r) return r;
									throw new TypeError("@@toPrimitive must return a primitive value.")
								}
								return String(e)
							}(e);
							return "symbol" == typeof t ? t : String(t)
						}(t = "_storage")) in e ? Object.defineProperty(e, t, {
							value: n,
							enumerable: !0,
							configurable: !0,
							writable: !0
						}) : e[t] = n
					}
					clear() {
						this._storage = {}
					}
					get length() {
						return Object.keys(this._storage).length
					}
					getItem(e) {
						return this._storage[e]
					}
					setItem(e, t) {
						this._storage[e] = t
					}
					removeItem(e) {
						delete this._storage[e]
					}
					key(e) {
						const t = Object.keys(this._storage);
						if (!(t.length <= e)) return t[e]
					}
					serialize() {
						let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
						if (0 === e.length) return JSON.stringify(this._storage);
						const t = {
							...this._storage
						};
						return e.forEach((e => {
							delete t[e]
						})), JSON.stringify(t)
					}
				}
				const o = new class extends r {
					constructor() {
						super();
						try {
							this._storage = window.localStorage, this._localStorageDisabled = !1
						} catch (e) {}
						this._storage || (console.warn("Local storage is disabled."), this._storage = new s, this._localStorageDisabled = !0)
					}
					isLocalStorageDisabled() {
						return this._localStorageDisabled
					}
					setLocalStorageDisabled(e) {
						this._localStorageDisabled = e;
						try {
							this._storage = e ? new s : window.localStorage
						} catch (e) {}
						this._storage || (this._storage = new s)
					}
					clear() {
						this._storage.clear(), this.emit("changed")
					}
					get length() {
						return this._storage.length
					}
					getItem(e) {
						return this._storage.getItem(e)
					}
					setItem(e, t) {
						let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
						this._storage.setItem(e, t), n || this.emit("changed")
					}
					removeItem(e) {
						this._storage.removeItem(e), this.emit("changed")
					}
					key(e) {
						return this._storage.key(e)
					}
					serialize() {
						let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
						if (this.isLocalStorageDisabled()) return this._storage.serialize(e);
						const t = this._storage.length,
							n = {};
						for (let r = 0; r < t; r++) {
							const t = this._storage.key(r);
							e.includes(t) || (n[t] = this._storage.getItem(t))
						}
						return JSON.stringify(n)
					}
				};
				n(449);
				var a = n(571);

				function c(e) {
					return a.parse(e)
				}
				const l = ["__proto__", "constructor", "prototype"];
				var d;
				! function(e) {
					e[e.PaymentRequired = 402] = "PaymentRequired"
				}(d || (d = {}));
				const u = "(//[^/?#]+)",
					h = "([^?#]*)",
					p = "^([a-z][a-z0-9\\.\\+-]*:)";

				function g(e) {
					const t = new RegExp(`${p}+`, "gi"),
						n = t.exec(e);
					if (n) {
						let r = n[n.length - 1].toLowerCase();
						"http:" !== r && "https:" !== r && (r = "https:"), (e = e.substring(t.lastIndex)).startsWith("//") && (e = r + e)
					}
					return e
				}

				function m(e = {}) {
					const t = [];
					for (const n in e) try {
						t.push(`${n}=${encodeURIComponent(JSON.stringify(e[n]))}`)
					} catch (e) {
						console.warn(`Error encoding ${n}: ${e}`)
					}
					return t
				}

				function f(e) {
					const t = {
						toString: v
					};
					let n, r, i;
					if (e = e.replace(/\s/g, ""), n = new RegExp(p, "gi"), r = n.exec(e), r && (t.protocol = r[1].toLowerCase(), e = e.substring(n.lastIndex)), n = new RegExp(`^${u}`, "gi"), r = n.exec(e), r) {
						let i = r[1].substring(2);
						e = e.substring(n.lastIndex);
						const s = i.indexOf("@"); - 1 !== s && (i = i.substring(s + 1)), t.host = i;
						const o = i.lastIndexOf(":"); - 1 !== o && (t.port = i.substring(o + 1), i = i.substring(0, o)), t.hostname = i
					}
					if (n = new RegExp(`^${h}`, "gi"), r = n.exec(e), r && (i = r[1], e = e.substring(n.lastIndex)), i ? i.startsWith("/") || (i = `/${i}`) : i = "/", t.pathname = i, e.startsWith("?")) {
						let n = e.indexOf("#", 1); - 1 === n && (n = e.length), t.search = e.substring(0, n), e = e.substring(n)
					} else t.search = "";
					return t.hash = e.startsWith("#") ? e : "", t
				}

				function v(e) {
					const {
						hash: t,
						host: n,
						pathname: r,
						protocol: i,
						search: s
					} = e || this;
					let o = "";
					return i && (o += i), n && (o += `//${n}`), o += r || "/", s && (o += s), t && (o += t), o
				}
				const y = {
						window: window.opener || window.parent
					},
					_ = "message";
				class b {
					constructor() {
						let {
							postisOptions: e
						} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						this.postis = function(e) {
							var t, n = e.scope,
								r = e.window,
								i = e.windowForEventListening || window,
								s = e.allowedOrigin,
								o = {},
								a = [],
								l = {},
								d = !1,
								u = "__ready__",
								h = function(e) {
									var t;
									try {
										t = c(e.data)
									} catch (e) {
										return
									}
									if ((!s || e.origin === s) && t && t.postis && t.scope === n) {
										var r = o[t.method];
										if (r)
											for (var i = 0; i < r.length; i++) r[i].call(null, t.params);
										else l[t.method] = l[t.method] || [], l[t.method].push(t.params)
									}
								};
							i.addEventListener("message", h, !1);
							var p = {
									listen: function(e, t) {
										o[e] = o[e] || [], o[e].push(t);
										var n = l[e];
										if (n)
											for (var r = o[e], i = 0; i < r.length; i++)
												for (var s = 0; s < n.length; s++) r[i].call(null, n[s]);
										delete l[e]
									},
									send: function(e) {
										var t = e.method;
										(d || e.method === u) && r && "function" == typeof r.postMessage ? r.postMessage(JSON.stringify({
											postis: !0,
											scope: n,
											method: t,
											params: e.params
										}), "*") : a.push(e)
									},
									ready: function(e) {
										d ? e() : setTimeout((function() {
											p.ready(e)
										}), 50)
									},
									destroy: function(e) {
										clearInterval(t), d = !1, i && "function" == typeof i.removeEventListener && i.removeEventListener("message", h), e && e()
									}
								},
								g = +new Date + Math.random() + "";
							return t = setInterval((function() {
								p.send({
									method: u,
									params: g
								})
							}), 50), p.listen(u, (function(e) {
								if (e === g) {
									clearInterval(t), d = !0;
									for (var n = 0; n < a.length; n++) p.send(a[n]);
									a = []
								} else p.send({
									method: u,
									params: e
								})
							})), p
						}({
							...y,
							...e
						}), this._receiveCallback = () => {}, this.postis.listen(_, (e => this._receiveCallback(e)))
					}
					dispose() {
						this.postis.destroy()
					}
					send(e) {
						this.postis.send({
							method: _,
							params: e
						})
					}
					setReceiveCallback(e) {
						this._receiveCallback = e
					}
				}
				const w = "request",
					L = "response";
				class k {
					constructor() {
						let {
							backend: e
						} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						this._listeners = new Map, this._requestID = 0, this._responseHandlers = new Map, this._unprocessedMessages = new Set, this.addListener = this.on, e && this.setBackend(e)
					}
					_disposeBackend() {
						this._backend && (this._backend.dispose(), this._backend = null)
					}
					_onMessageReceived(e) {
						if (e.type === L) {
							const t = this._responseHandlers.get(e.id);
							t && (t(e), this._responseHandlers.delete(e.id))
						} else e.type === w ? this.emit("request", e.data, ((t, n) => {
							this._backend.send({
								type: L,
								error: n,
								id: e.id,
								result: t
							})
						})) : this.emit("event", e.data)
					}
					dispose() {
						this._responseHandlers.clear(), this._unprocessedMessages.clear(), this.removeAllListeners(), this._disposeBackend()
					}
					emit(e) {
						for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
						const i = this._listeners.get(e);
						let s = !1;
						return i && i.size && i.forEach((e => {
							s = e(...n) || s
						})), s || this._unprocessedMessages.add(n), s
					}
					on(e, t) {
						let n = this._listeners.get(e);
						return n || (n = new Set, this._listeners.set(e, n)), n.add(t), this._unprocessedMessages.forEach((e => {
							t(...e) && this._unprocessedMessages.delete(e)
						})), this
					}
					removeAllListeners(e) {
						return e ? this._listeners.delete(e) : this._listeners.clear(), this
					}
					removeListener(e, t) {
						const n = this._listeners.get(e);
						return n && n.delete(t), this
					}
					sendEvent() {
						let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
						this._backend && this._backend.send({
							type: "event",
							data: e
						})
					}
					sendRequest(e) {
						if (!this._backend) return Promise.reject(new Error("No transport backend defined!"));
						this._requestID++;
						const t = this._requestID;
						return new Promise(((n, r) => {
							this._responseHandlers.set(t, (e => {
								let {
									error: t,
									result: i
								} = e;
								void 0 !== i ? n(i) : r(void 0 !== t ? t : new Error("Unexpected response format!"))
							}));
							try {
								this._backend.send({
									type: w,
									data: e,
									id: t
								})
							} catch (e) {
								this._responseHandlers.delete(t), r(e)
							}
						}))
					}
					setBackend(e) {
						this._disposeBackend(), this._backend = e, this._backend.setReceiveCallback(this._onMessageReceived.bind(this))
					}
				}
				let C;
				try {
					C = function(e, t = !1, n = "hash") {
						if (!e) return {};
						"string" == typeof e && (e = new URL(e));
						const r = "search" === n ? e.search : e.hash,
							i = {},
							s = r?.substr(1).split("&") || [];
						if ("hash" === n && 1 === s.length) {
							const e = s[0];
							if (e.startsWith("/") && 1 === e.split("&").length) return i
						}
						return s.forEach((e => {
							const n = e.split("="),
								r = n[0];
							if (!r || r.split(".").some((e => l.includes(e)))) return;
							let s;
							try {
								if (s = n[1], !t) {
									const e = decodeURIComponent(s).replace(/\\&/, "&").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
									s = "undefined" === e ? void 0 : c(e)
								}
							} catch (e) {
								return void
								function(e, t = "") {
									console.error(t, e), window.onerror?.(t, void 0, void 0, void 0, e)
								}(e, `Failed to parse URL parameter value: ${String(s)}`)
							}
							i[r] = s
						})), i
					}(window.location).jitsi_meet_external_api_id
				} catch (e) {}(window.JitsiMeetJS || (window.JitsiMeetJS = {}), window.JitsiMeetJS.app || (window.JitsiMeetJS.app = {}), window.JitsiMeetJS.app).setExternalTransportBackend = e => undefined.setBackend(e);
				var x = n(860);
				const S = n.n(x)().getLogger("modules/API/external/functions.js");

				function E(e, t) {
					return e.sendRequest({
						type: "devices",
						name: "setDevice",
						device: t
					})
				}
				const R = ["css/all.css", "libs/alwaysontop.min.js"],
					O = {
						addBreakoutRoom: "add-breakout-room",
						answerKnockingParticipant: "answer-knocking-participant",
						approveVideo: "approve-video",
						askToUnmute: "ask-to-unmute",
						autoAssignToBreakoutRooms: "auto-assign-to-breakout-rooms",
						avatarUrl: "avatar-url",
						cancelPrivateChat: "cancel-private-chat",
						closeBreakoutRoom: "close-breakout-room",
						displayName: "display-name",
						endConference: "end-conference",
						email: "email",
						grantModerator: "grant-moderator",
						hangup: "video-hangup",
						hideNotification: "hide-notification",
						initiatePrivateChat: "initiate-private-chat",
						joinBreakoutRoom: "join-breakout-room",
						localSubject: "local-subject",
						kickParticipant: "kick-participant",
						muteEveryone: "mute-everyone",
						overwriteConfig: "overwrite-config",
						overwriteNames: "overwrite-names",
						password: "password",
						pinParticipant: "pin-participant",
						rejectParticipant: "reject-participant",
						removeBreakoutRoom: "remove-breakout-room",
						resizeFilmStrip: "resize-film-strip",
						resizeLargeVideo: "resize-large-video",
						sendCameraFacingMode: "send-camera-facing-mode-message",
						sendChatMessage: "send-chat-message",
						sendEndpointTextMessage: "send-endpoint-text-message",
						sendParticipantToRoom: "send-participant-to-room",
						sendTones: "send-tones",
						setAssumedBandwidthBps: "set-assumed-bandwidth-bps",
						setFollowMe: "set-follow-me",
						setLargeVideoParticipant: "set-large-video-participant",
						setMediaEncryptionKey: "set-media-encryption-key",
						setNoiseSuppressionEnabled: "set-noise-suppression-enabled",
						setParticipantVolume: "set-participant-volume",
						setSubtitles: "set-subtitles",
						setTileView: "set-tile-view",
						setVideoQuality: "set-video-quality",
						showNotification: "show-notification",
						startRecording: "start-recording",
						startShareVideo: "start-share-video",
						stopRecording: "stop-recording",
						stopShareVideo: "stop-share-video",
						subject: "subject",
						submitFeedback: "submit-feedback",
						toggleAudio: "toggle-audio",
						toggleCamera: "toggle-camera",
						toggleCameraMirror: "toggle-camera-mirror",
						toggleChat: "toggle-chat",
						toggleE2EE: "toggle-e2ee",
						toggleFilmStrip: "toggle-film-strip",
						toggleLobby: "toggle-lobby",
						toggleModeration: "toggle-moderation",
						toggleNoiseSuppression: "toggle-noise-suppression",
						toggleParticipantsPane: "toggle-participants-pane",
						toggleRaiseHand: "toggle-raise-hand",
						toggleShareScreen: "toggle-share-screen",
						toggleSubtitles: "toggle-subtitles",
						toggleTileView: "toggle-tile-view",
						toggleVirtualBackgroundDialog: "toggle-virtual-background",
						toggleVideo: "toggle-video",
						toggleWhiteboard: "toggle-whiteboard"
					},
					j = {
						"avatar-changed": "avatarChanged",
						"audio-availability-changed": "audioAvailabilityChanged",
						"audio-mute-status-changed": "audioMuteStatusChanged",
						"audio-or-video-sharing-toggled": "audioOrVideoSharingToggled",
						"breakout-rooms-updated": "breakoutRoomsUpdated",
						"browser-support": "browserSupport",
						"camera-error": "cameraError",
						"chat-updated": "chatUpdated",
						"compute-pressure-changed": "computePressureChanged",
						"conference-created-timestamp": "conferenceCreatedTimestamp",
						"content-sharing-participants-changed": "contentSharingParticipantsChanged",
						"data-channel-closed": "dataChannelClosed",
						"data-channel-opened": "dataChannelOpened",
						"device-list-changed": "deviceListChanged",
						"display-name-change": "displayNameChange",
						"dominant-speaker-changed": "dominantSpeakerChanged",
						"email-change": "emailChange",
						"error-occurred": "errorOccurred",
						"endpoint-text-message-received": "endpointTextMessageReceived",
						"face-landmark-detected": "faceLandmarkDetected",
						"feedback-submitted": "feedbackSubmitted",
						"feedback-prompt-displayed": "feedbackPromptDisplayed",
						"filmstrip-display-changed": "filmstripDisplayChanged",
						"incoming-message": "incomingMessage",
						"knocking-participant": "knockingParticipant",
						log: "log",
						"mic-error": "micError",
						"moderation-participant-approved": "moderationParticipantApproved",
						"moderation-participant-rejected": "moderationParticipantRejected",
						"moderation-status-changed": "moderationStatusChanged",
						"mouse-enter": "mouseEnter",
						"mouse-leave": "mouseLeave",
						"mouse-move": "mouseMove",
						"non-participant-message-received": "nonParticipantMessageReceived",
						"notification-triggered": "notificationTriggered",
						"outgoing-message": "outgoingMessage",
						"p2p-status-changed": "p2pStatusChanged",
						"participant-joined": "participantJoined",
						"participant-kicked-out": "participantKickedOut",
						"participant-left": "participantLeft",
						"participant-role-changed": "participantRoleChanged",
						"participants-pane-toggled": "participantsPaneToggled",
						"password-required": "passwordRequired",
						"peer-connection-failure": "peerConnectionFailure",
						"prejoin-screen-loaded": "prejoinScreenLoaded",
						"proxy-connection-event": "proxyConnectionEvent",
						"raise-hand-updated": "raiseHandUpdated",
						ready: "ready",
						"recording-link-available": "recordingLinkAvailable",
						"recording-status-changed": "recordingStatusChanged",
						"participant-menu-button-clicked": "participantMenuButtonClick",
						"video-ready-to-close": "readyToClose",
						"video-conference-joined": "videoConferenceJoined",
						"video-conference-left": "videoConferenceLeft",
						"video-availability-changed": "videoAvailabilityChanged",
						"video-mute-status-changed": "videoMuteStatusChanged",
						"video-quality-changed": "videoQualityChanged",
						"screen-sharing-status-changed": "screenSharingStatusChanged",
						"subject-change": "subjectChange",
						"suspend-detected": "suspendDetected",
						"tile-view-changed": "tileViewChanged",
						"toolbar-button-clicked": "toolbarButtonClicked",
						"transcribing-status-changed": "transcribingStatusChanged",
						"transcription-chunk-received": "transcriptionChunkReceived",
						"whiteboard-status-changed": "whiteboardStatusChanged"
					},
					I = {
						"_request-desktop-sources": "_requestDesktopSources"
					};
				let API_KEY = 0;

				function N(e, t) {
					e._numberOfParticipants += t
				}

				function A(e) {
					let t;
					return "string" == typeof e && null !== String(e).match(/([0-9]*\.?[0-9]+)(em|pt|px|((d|l|s)?v)(h|w)|%)$/) ? t = e : "number" == typeof e && (t = `${e}px`), t
				}
				class D extends(i()) {
					constructor(e) {
						super();
						for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
						const {
							roomName: i = "",
							width: parametroB = "100%",
							height: parametroA = "100%",
							parentNode: c = document.body,
							configOverwrite: l = {},
							interfaceConfigOverwrite: d = {},
							jwt: u,
							lang: h,
							onload: p,
							invitees: v,
							iceServers: y,
							devices: _,
							userInfo: w,
							e2eeKey: L,
							release: C,
							sandbox: parametroC = ""
						} = function(e) {
							if (!e.length) return {};
							switch (typeof e[0]) {
								case "string":
								case "undefined": {
									const [t, n, r, i, s, o, a, c, l] = e;
									return {
										roomName: t,
										width: n,
										height: r,
										parentNode: i,
										configOverwrite: s,
										interfaceConfigOverwrite: o,
										jwt: a,
										onload: c,
										lang: l
									}
								}
								case "object":
									return e[0];
								default:
									throw new Error("Can't parse the arguments!")
							}
						}(n), S = o.getItem("jitsiLocalStorage");
						this._parentNode = c, this._url = function(hostMeetJitSi) {
							return function(e) {
                                console.log("Algo sucede aca!! OJO!!")
								let t;
								t = e.serverURL && e.room ? new URL(e.room, e.serverURL).toString() : e.room ? e.room : e.url || "";
								const n = f(g(t));
								if (!n.protocol) {
									let t = e.protocol || e.scheme;
									t && (t.endsWith(":") || (t += ":"), n.protocol = t)
								}
								let {
									pathname: r
								} = n;
								if (!n.host) {
									const t = e.domain || e.host || e.hostname;
									if (t) {
										const {
											host: e,
											hostname: i,
											pathname: s,
											port: o
										} = f(g(`org.jitsi.meet://${t}`));
										e && (n.host = e, n.hostname = i, n.port = o), "/" === r && "/" !== s && (r = s)
									}
								}
								const i = e.roomName || e.room;
								!i || !n.pathname.endsWith("/") && n.pathname.endsWith(`/${i}`) || (r.endsWith("/") || (r += "/"), r += i), n.pathname = r;
								const {
									jwt: s,
									lang: o,
									release: a
								} = e, c = new URLSearchParams(n.search);
								s && c.set("jwt", s);
								const {
									defaultLanguage: l
								} = e.configOverwrite || {};
								(o || l) && c.set("lang", o || l), a && c.set("release", a);
								const d = c.toString();
								d && (n.search = `?${d}`);
								let {
									hash: u
								} = n;
								s && (u = u.length ? `${u}&jwt=${JSON.stringify(s)}` : `#jwt=${JSON.stringify(s)}`);
								for (const t of ["config", "iceServers", "interfaceConfig", "devices", "userInfo", "appData"]) {
									const n = m(e[`${t}Overwrite`] || e[t] || e[`${t}Override`]);
									if (n.length) {
										let e = `${t}.${n.join(`&${t}.`)}`;
										u.length ? e = `&${e}` : u = "#", u += e
									}
								}
								return n.hash = u, n.toString() || void 0
							}({
								...arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
								url: `https://${hostMeetJitSi}/#jitsi_meet_external_api_id=${API_KEY}`
							})
						}(e, {
							configOverwrite: l,
							iceServers: y,
							interfaceConfigOverwrite: d,
							jwt: u,
							lang: h,
							roomName: i,
							devices: _,
							userInfo: w,
							appData: {
								localStorageContent: S
							},
							release: C
						}), this._createIFrame(parametroA, parametroB, parametroC), this._transport = new k({
							backend: new b({
								postisOptions: {
									allowedOrigin: new URL(this._url).origin,
									//scope: `jitsi_meet_external_api_${API_KEY}`,
									window: this._frame.contentWindow
								}
							})
						}), Array.isArray(v) && v.length > 0 && this.invite(v), this._onload = p, this._tmpE2EEKey = L, this._isLargeVideoVisible = !1, this._isPrejoinVideoVisible = !1, this._numberOfParticipants = 0, this._participants = {}, this._myUserID = void 0, this._onStageParticipant = void 0, this._setupListeners(), API_KEY++
					}
					_createIFrame(e, t, n) {
						const r = `jitsiConferenceFrame${API_KEY}`;
                        console.log("CREANDO IFRAME")
						this._frame = document.createElement("iframe"), this._frame.allow = ["autoplay", "camera", "clipboard-write", "compute-pressure", "display-capture", "hid", "microphone", "screen-wake-lock", "speaker-selection"].join("; "), this._frame.name = r, this._frame.id = r, this._setSize(e, t), this._frame.setAttribute("allowFullScreen", "true"), this._frame.style.border = 0, n && (this._frame.sandbox = n), this._frame.src = this._url, this._frame = this._parentNode.appendChild(this._frame)
					}
					_getAlwaysOnTopResources() {
						const e = this._frame.contentWindow,
							t = e.document;
						let n = "";
						const r = t.querySelector("base");
						if (r && r.href) n = r.href;
						else {
							const {
								protocol: t,
								host: r
							} = e.location;
							n = `${t}//${r}`
						}
						return R.map((e => new URL(e, n).href))
					}
					_getFormattedDisplayName(e) {
						const {
							formattedDisplayName: t
						} = this._participants[e] || {};
						return t
					}
					_getOnStageParticipant() {
						return this._onStageParticipant
					}
					_getLargeVideo() {
						const e = this.getIFrame();
						if (this._isLargeVideoVisible && e && e.contentWindow && e.contentWindow.document) return e.contentWindow.document.getElementById("largeVideo")
					}
					_getPrejoinVideo() {
						const e = this.getIFrame();
						if (this._isPrejoinVideoVisible && e && e.contentWindow && e.contentWindow.document) return e.contentWindow.document.getElementById("prejoinVideo")
					}
					_getParticipantVideo(e) {
						const t = this.getIFrame();
						if (t && t.contentWindow && t.contentWindow.document) return void 0 === e || e === this._myUserID ? t.contentWindow.document.getElementById("localVideo_container") : t.contentWindow.document.querySelector(`#participant_${e} video`)
					}
					_setSize(e, t) {
						const n = A(e),
							r = A(t);
						void 0 !== n && (this._height = e, this._frame.style.height = n), void 0 !== r && (this._width = t, this._frame.style.width = r)
					}
					_setupListeners() {
						this._transport.on("event", (e => {
							let {
								name: t,
								...n
							} = e;
							const r = n.id;
							switch (t) {
								case "ready":
									var i;
									null === (i = this._onload) || void 0 === i || i.call(this);
									break;
								case "video-conference-joined":
									if (void 0 !== this._tmpE2EEKey) {
										const e = e => {
											const t = [];
											for (let n = 0; n < e.length; n += 2) t.push(parseInt(e.substring(n, n + 2), 16));
											return t
										};
										this.executeCommand("setMediaEncryptionKey", JSON.stringify({
											exportedKey: e(this._tmpE2EEKey),
											index: 0
										})), this._tmpE2EEKey = void 0
									}
									this._myUserID = r, this._participants[r] = {
										email: n.email,
										avatarURL: n.avatarURL
									};
								case "participant-joined":
									this._participants[r] = this._participants[r] || {}, this._participants[r].displayName = n.displayName, this._participants[r].formattedDisplayName = n.formattedDisplayName, N(this, 1);
									break;
								case "participant-left":
									N(this, -1), delete this._participants[r];
									break;
								case "display-name-change": {
									const e = this._participants[r];
									e && (e.displayName = n.displayname, e.formattedDisplayName = n.formattedDisplayName);
									break
								}
								case "email-change": {
									const e = this._participants[r];
									e && (e.email = n.email);
									break
								}
								case "avatar-changed": {
									const e = this._participants[r];
									e && (e.avatarURL = n.avatarURL);
									break
								}
								case "on-stage-participant-changed":
									this._onStageParticipant = r, this.emit("largeVideoChanged");
									break;
								case "large-video-visibility-changed":
									this._isLargeVideoVisible = n.isVisible, this.emit("largeVideoChanged");
									break;
								case "prejoin-screen-loaded":
									this._participants[r] = {
										displayName: n.displayName,
										formattedDisplayName: n.formattedDisplayName
									};
									break;
								case "on-prejoin-video-changed":
									this._isPrejoinVideoVisible = n.isVisible, this.emit("prejoinVideoChanged");
									break;
								case "video-conference-left":
									N(this, -1), delete this._participants[this._myUserID];
									break;
								case "video-quality-changed":
									this._videoQuality = n.videoQuality;
									break;
								case "breakout-rooms-updated":
									this.updateNumberOfParticipants(n.rooms);
									break;
								case "local-storage-changed":
									return o.setItem("jitsiLocalStorage", n.localStorageContent), !0
							}
							const s = j[t];
							return !!s && (this.emit(s, n), !0)
						})), this._transport.on("request", ((e, t) => {
							const n = I[e.name],
								r = {
									...e,
									name: n
								};
							n && this.emit(n, r, t)
						}))
					}
					updateNumberOfParticipants(e) {
						if (!e || !Object.keys(e).length) return;
						const t = Object.keys(e).reduce(((t, n) => {
							var r;
							return null !== (r = e[n]) && void 0 !== r && r.participants ? Object.keys(e[n].participants).length + t : t
						}), 0);
						this._numberOfParticipants = t
					}
					async getRoomsInfo() {
						return this._transport.sendRequest({
							name: "rooms-info"
						})
					}
					isP2pActive() {
						return this._transport.sendRequest({
							name: "get-p2p-status"
						})
					}
					addEventListener(e, t) {
						this.on(e, t)
					}
					addEventListeners(e) {
						for (const t in e) this.addEventListener(t, e[t])
					}
					captureLargeVideoScreenshot() {
						return this._transport.sendRequest({
							name: "capture-largevideo-screenshot"
						})
					}
					dispose() {
						this.emit("_willDispose"), this._transport.dispose(), this.removeAllListeners(), this._frame && this._frame.parentNode && this._frame.parentNode.removeChild(this._frame)
					}
					executeCommand(e) {
						if (e in O) {
							for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
							this._transport.sendEvent({
								data: n,
								name: O[e]
							})
						} else console.error("Not supported command name.")
					}
					executeCommands(e) {
						for (const t in e) this.executeCommand(t, e[t])
					}
					getAvailableDevices() {
						return function(e) {
							return e.sendRequest({
								type: "devices",
								name: "getAvailableDevices"
							}).catch((e => (S.error(e), {})))
						}(this._transport)
					}
					getContentSharingParticipants() {
						return this._transport.sendRequest({
							name: "get-content-sharing-participants"
						})
					}
					getCurrentDevices() {
						return function(e) {
							return e.sendRequest({
								type: "devices",
								name: "getCurrentDevices"
							}).catch((e => (S.error(e), {})))
						}(this._transport)
					}
					getCustomAvatarBackgrounds() {
						return this._transport.sendRequest({
							name: "get-custom-avatar-backgrounds"
						})
					}
					getLivestreamUrl() {
						return this._transport.sendRequest({
							name: "get-livestream-url"
						})
					}
					getParticipantsInfo() {
						const e = Object.keys(this._participants),
							t = Object.values(this._participants);
						return t.forEach(((t, n) => {
							t.participantId = e[n]
						})), t
					}
					getVideoQuality() {
						return this._videoQuality
					}
					isAudioAvailable() {
						return this._transport.sendRequest({
							name: "is-audio-available"
						})
					}
					isDeviceChangeAvailable(e) {
						return function(e, t) {
							return e.sendRequest({
								deviceType: t,
								type: "devices",
								name: "isDeviceChangeAvailable"
							})
						}(this._transport, e)
					}
					isDeviceListAvailable() {
						return function(e) {
							return e.sendRequest({
								type: "devices",
								name: "isDeviceListAvailable"
							})
						}(this._transport)
					}
					isMultipleAudioInputSupported() {
						return function(e) {
							return e.sendRequest({
								type: "devices",
								name: "isMultipleAudioInputSupported"
							})
						}(this._transport)
					}
					invite(e) {
						return Array.isArray(e) && 0 !== e.length ? this._transport.sendRequest({
							name: "invite",
							invitees: e
						}) : Promise.reject(new TypeError("Invalid Argument"))
					}
					isAudioMuted() {
						return this._transport.sendRequest({
							name: "is-audio-muted"
						})
					}
					isAudioDisabled() {
						return this._transport.sendRequest({
							name: "is-audio-disabled"
						})
					}
					isModerationOn(e) {
						return this._transport.sendRequest({
							name: "is-moderation-on",
							mediaType: e
						})
					}
					isParticipantForceMuted(e, t) {
						return this._transport.sendRequest({
							name: "is-participant-force-muted",
							participantId: e,
							mediaType: t
						})
					}
					isParticipantsPaneOpen() {
						return this._transport.sendRequest({
							name: "is-participants-pane-open"
						})
					}
					isSharingScreen() {
						return this._transport.sendRequest({
							name: "is-sharing-screen"
						})
					}
					isStartSilent() {
						return this._transport.sendRequest({
							name: "is-start-silent"
						})
					}
					getAvatarURL(e) {
						const {
							avatarURL: t
						} = this._participants[e] || {};
						return t
					}
					getDeploymentInfo() {
						return this._transport.sendRequest({
							name: "deployment-info"
						})
					}
					getDisplayName(e) {
						const {
							displayName: t
						} = this._participants[e] || {};
						return t
					}
					getEmail(e) {
						const {
							email: t
						} = this._participants[e] || {};
						return t
					}
					getIFrame() {
						return this._frame
					}
					getNumberOfParticipants() {
						return this._numberOfParticipants
					}
					getSessionId() {
						return this._transport.sendRequest({
							name: "session-id"
						})
					}
					getSupportedCommands() {
						return Object.keys(O)
					}
					getSupportedEvents() {
						return Object.values(j)
					}
					isVideoAvailable() {
						return this._transport.sendRequest({
							name: "is-video-available"
						})
					}
					isVideoMuted() {
						return this._transport.sendRequest({
							name: "is-video-muted"
						})
					}
					listBreakoutRooms() {
						return this._transport.sendRequest({
							name: "list-breakout-rooms"
						})
					}
					_isNewElectronScreensharingSupported() {
						return this._transport.sendRequest({
							name: "_new_electron_screensharing_supported"
						})
					}
					pinParticipant(e, t) {
						this.executeCommand("pinParticipant", e, t)
					}
					removeEventListener(e) {
						this.removeAllListeners(e)
					}
					removeEventListeners(e) {
						e.forEach((e => this.removeEventListener(e)))
					}
					resizeLargeVideo(e, t) {
						e <= this._width && t <= this._height && this.executeCommand("resizeLargeVideo", e, t)
					}
					sendProxyConnectionEvent(e) {
						this._transport.sendEvent({
							data: [e],
							name: "proxy-connection-event"
						})
					}
					setAudioInputDevice(e, t) {
						return function(e, t, n) {
							return E(e, {
								id: n,
								kind: "audioinput",
								label: t
							})
						}(this._transport, e, t)
					}
					setAudioOutputDevice(e, t) {
						return function(e, t, n) {
							return E(e, {
								id: n,
								kind: "audiooutput",
								label: t
							})
						}(this._transport, e, t)
					}
					setLargeVideoParticipant(e, t) {
						this.executeCommand("setLargeVideoParticipant", e, t)
					}
					setVideoInputDevice(e, t) {
						return function(e, t, n) {
							return E(e, {
								id: n,
								kind: "videoinput",
								label: t
							})
						}(this._transport, e, t)
					}
					startRecording(e) {
						this.executeCommand("startRecording", e)
					}
					stopRecording(e, t) {
						this.executeCommand("stopRecording", e, t)
					}
					toggleE2EE(e) {
						this.executeCommand("toggleE2EE", e)
					}
					async setMediaEncryptionKey(e) {
						const {
							key: t,
							index: n
						} = e;
						if (t) {
							const e = await crypto.subtle.exportKey("raw", t);
							this.executeCommand("setMediaEncryptionKey", JSON.stringify({
								exportedKey: Array.from(new Uint8Array(e)),
								index: n
							}))
						} else this.executeCommand("setMediaEncryptionKey", JSON.stringify({
							exportedKey: !1,
							index: n
						}))
					}
				}
			},
			872: (e, t, n) => {
				e.exports = n(372).default
			},
			135: (e, t) => {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.BLANK_URL = t.relativeFirstCharacters = t.urlSchemeRegex = t.ctrlCharactersRegex = t.htmlCtrlEntityRegex = t.htmlEntitiesRegex = t.invalidProtocolRegex = void 0, t.invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im, t.htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g, t.htmlCtrlEntityRegex = /&(newline|tab);/gi, t.ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim, t.urlSchemeRegex = /^.+(:|&colon;)/gim, t.relativeFirstCharacters = [".", "/"], t.BLANK_URL = "about:blank"
			},
			449: (e, t, n) => {
				"use strict";
				n(135)
			},
			571: (e, t) => {
				"use strict";
				const n = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*\:/;
				t.parse = function(e) {
					const r = "object" == typeof(arguments.length <= 1 ? void 0 : arguments[1]) && (arguments.length <= 1 ? void 0 : arguments[1]),
						i = (arguments.length <= 1 ? 0 : arguments.length - 1) > 1 || !r ? arguments.length <= 1 ? void 0 : arguments[1] : void 0,
						s = (arguments.length <= 1 ? 0 : arguments.length - 1) > 1 && (arguments.length <= 2 ? void 0 : arguments[2]) || r || {},
						o = JSON.parse(e, i);
					return "ignore" === s.protoAction ? o : o && "object" == typeof o && e.match(n) ? (t.scan(o, s), o) : o
				}, t.scan = function(e) {
					let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
						n = [e];
					for (; n.length;) {
						const e = n;
						n = [];
						for (const r of e) {
							if (Object.prototype.hasOwnProperty.call(r, "__proto__")) {
								if ("remove" !== t.protoAction) throw new SyntaxError("Object contains forbidden prototype property");
								delete r.__proto__
							}
							for (const e in r) {
								const t = r[e];
								t && "object" == typeof t && n.push(r[e])
							}
						}
					}
				}, t.safeParse = function(e, n) {
					try {
						return t.parse(e, n)
					} catch (e) {
						return null
					}
				}
			},
			369: (e, t, n) => {
				var r = n(7);

				function i(e, t) {
					this.logStorage = e, this.stringifyObjects = !(!t || !t.stringifyObjects) && t.stringifyObjects, this.storeInterval = t && t.storeInterval ? t.storeInterval : 3e4, this.maxEntryLength = t && t.maxEntryLength ? t.maxEntryLength : 1e4, Object.values(r.levels).forEach(function(e) {
						this[e] = function() {
							this._log.apply(this, arguments)
						}.bind(this, e)
					}.bind(this)), this.storeLogsIntervalID = null, this.queue = [], this.totalLen = 0, this.outputCache = []
				}
				i.prototype.stringify = function(e) {
					try {
						return JSON.stringify(e)
					} catch (e) {
						return "[object with circular refs?]"
					}
				}, i.prototype.formatLogMessage = function(e) {
					for (var t = "", n = 1, r = arguments.length; n < r; n++) {
						var i = arguments[n];
						i instanceof Error ? t += i.toString() + ": " + i.stack : this.stringifyObjects && "object" == typeof i ? t += this.stringify(i) : t += i, n !== r - 1 && (t += " ")
					}
					return t.length ? t : null
				}, i.prototype._log = function() {
					var e = arguments[1],
						t = this.formatLogMessage.apply(this, arguments);
					if (t) {
						var n = this.queue[this.queue.length - 1];
						(n && n.text) === t ? n.count += 1 : (this.queue.push({
							text: t,
							timestamp: e,
							count: 1
						}), this.totalLen += t.length)
					}
					this.totalLen >= this.maxEntryLength && this._flush(!0, !0)
				}, i.prototype.start = function() {
					this._reschedulePublishInterval()
				}, i.prototype._reschedulePublishInterval = function() {
					this.storeLogsIntervalID && (window.clearTimeout(this.storeLogsIntervalID), this.storeLogsIntervalID = null), this.storeLogsIntervalID = window.setTimeout(this._flush.bind(this, !1, !0), this.storeInterval)
				}, i.prototype.flush = function() {
					this._flush(!1, !0)
				}, i.prototype._storeLogs = function(e) {
					try {
						this.logStorage.storeLogs(e)
					} catch (e) {
						console.error("LogCollector error when calling logStorage.storeLogs(): ", e)
					}
				}, i.prototype._flush = function(e, t) {
					var n = !1;
					try {
						n = this.logStorage.isReady()
					} catch (e) {
						console.error("LogCollector error when calling logStorage.isReady(): ", e)
					}
					this.totalLen > 0 && (n || e) && (n ? (this.outputCache.length && (this.outputCache.forEach(function(e) {
						this._storeLogs(e)
					}.bind(this)), this.outputCache = []), this._storeLogs(this.queue)) : this.outputCache.push(this.queue), this.queue = [], this.totalLen = 0), t && this._reschedulePublishInterval()
				}, i.prototype.stop = function() {
					this._flush(!1, !1)
				}, e.exports = i
			},
			7: e => {
				var t = {
					trace: 0,
					debug: 1,
					info: 2,
					log: 3,
					warn: 4,
					error: 5
				};
				s.consoleTransport = console;
				var n = [s.consoleTransport];
				s.addGlobalTransport = function(e) {
					-1 === n.indexOf(e) && n.push(e)
				}, s.removeGlobalTransport = function(e) {
					var t = n.indexOf(e); - 1 !== t && n.splice(t, 1)
				};
				var r = {};

				function i() {
					var e = arguments[0],
						i = arguments[1],
						s = Array.prototype.slice.call(arguments, 2);
					if (!(t[i] < e.level))
						for (var o = !(e.options.disableCallerInfo || r.disableCallerInfo) && function() {
								var e = {
										methodName: "",
										fileLocation: "",
										line: null,
										column: null
									},
									t = new Error,
									n = t.stack ? t.stack.split("\n") : [];
								if (!n || n.length < 3) return e;
								var r = null;
								return n[3] && (r = n[3].match(/\s*at\s*(.+?)\s*\((\S*)\s*:(\d*)\s*:(\d*)\)/)), !r || r.length <= 4 ? (0 === n[2].indexOf("log@") ? e.methodName = n[3].substr(0, n[3].indexOf("@")) : e.methodName = n[2].substr(0, n[2].indexOf("@")), e) : (e.methodName = r[1], e.fileLocation = r[2], e.line = r[3], e.column = r[4], e)
							}(), a = n.concat(e.transports), c = 0; c < a.length; c++) {
							var l = a[c],
								d = l[i];
							if (d && "function" == typeof d) {
								var u = [];
								u.push((new Date).toISOString()), e.id && u.push("[" + e.id + "]"), o && o.methodName.length > 1 && u.push("<" + o.methodName + ">: ");
								var h = u.concat(s);
								try {
									d.bind(l).apply(l, h)
								} catch (e) {
									console.error("An error occured when trying to log with one of the available transports", e)
								}
							}
						}
				}

				function s(e, n, r, s) {
					this.id = n, this.options = s || {}, this.transports = r, this.transports || (this.transports = []), this.level = t[e];
					for (var o = Object.keys(t), a = 0; a < o.length; a++) this[o[a]] = i.bind(null, this, o[a])
				}
				s.setGlobalOptions = function(e) {
					r = e || {}
				}, s.prototype.setLevel = function(e) {
					this.level = t[e]
				}, e.exports = s, s.levels = {
					TRACE: "trace",
					DEBUG: "debug",
					INFO: "info",
					LOG: "log",
					WARN: "warn",
					ERROR: "error"
				}
			},
			860: (e, t, n) => {
				var r = n(7),
					i = n(369),
					s = {},
					o = [],
					a = r.levels.TRACE;
				e.exports = {
					addGlobalTransport: function(e) {
						r.addGlobalTransport(e)
					},
					removeGlobalTransport: function(e) {
						r.removeGlobalTransport(e)
					},
					setGlobalOptions: function(e) {
						r.setGlobalOptions(e)
					},
					getLogger: function(e, t, n) {
						var i = new r(a, e, t, n);
						return e ? (s[e] = s[e] || [], s[e].push(i)) : o.push(i), i
					},
					getUntrackedLogger: function(e, t, n) {
						return new r(a, e, t, n)
					},
					setLogLevelById: function(e, t) {
						for (var n = t ? s[t] || [] : o, r = 0; r < n.length; r++) n[r].setLevel(e)
					},
					setLogLevel: function(e) {
						a = e;
						for (var t = 0; t < o.length; t++) o[t].setLevel(e);
						for (var n in s) {
							var r = s[n] || [];
							for (t = 0; t < r.length; t++) r[t].setLevel(e)
						}
					},
					levels: r.levels,
					LogCollector: i
				}
			},
			620: e => {
				"use strict";
				var t, n = "object" == typeof Reflect ? Reflect : null,
					r = n && "function" == typeof n.apply ? n.apply : function(e, t, n) {
						return Function.prototype.apply.call(e, t, n)
					};
				t = n && "function" == typeof n.ownKeys ? n.ownKeys : Object.getOwnPropertySymbols ? function(e) {
					return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
				} : function(e) {
					return Object.getOwnPropertyNames(e)
				};
				var i = Number.isNaN || function(e) {
					return e != e
				};

				function s() {
					s.init.call(this)
				}
				e.exports = s, e.exports.once = function(e, t) {
					return new Promise((function(n, r) {
						function i(n) {
							e.removeListener(t, s), r(n)
						}

						function s() {
							"function" == typeof e.removeListener && e.removeListener("error", i), n([].slice.call(arguments))
						}
						m(e, t, s, {
							once: !0
						}), "error" !== t && function(e, t, n) {
							"function" == typeof e.on && m(e, "error", t, {
								once: !0
							})
						}(e, i)
					}))
				}, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
				var o = 10;

				function a(e) {
					if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
				}

				function c(e) {
					return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners
				}

				function l(e, t, n, r) {
					var i, s, o, l;
					if (a(n), void 0 === (s = e._events) ? (s = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== s.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), s = e._events), o = s[t]), void 0 === o) o = s[t] = n, ++e._eventsCount;
					else if ("function" == typeof o ? o = s[t] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), (i = c(e)) > 0 && o.length > i && !o.warned) {
						o.warned = !0;
						var d = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
						d.name = "MaxListenersExceededWarning", d.emitter = e, d.type = t, d.count = o.length, l = d, console && console.warn && console.warn(l)
					}
					return e
				}

				function d() {
					if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
				}

				function u(e, t, n) {
					var r = {
							fired: !1,
							wrapFn: void 0,
							target: e,
							type: t,
							listener: n
						},
						i = d.bind(r);
					return i.listener = n, r.wrapFn = i, i
				}

				function h(e, t, n) {
					var r = e._events;
					if (void 0 === r) return [];
					var i = r[t];
					return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function(e) {
						for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
						return t
					}(i) : g(i, i.length)
				}

				function p(e) {
					var t = this._events;
					if (void 0 !== t) {
						var n = t[e];
						if ("function" == typeof n) return 1;
						if (void 0 !== n) return n.length
					}
					return 0
				}

				function g(e, t) {
					for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
					return n
				}

				function m(e, t, n, r) {
					if ("function" == typeof e.on) r.once ? e.once(t, n) : e.on(t, n);
					else {
						if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
						e.addEventListener(t, (function i(s) {
							r.once && e.removeEventListener(t, i), n(s)
						}))
					}
				}
				Object.defineProperty(s, "defaultMaxListeners", {
					enumerable: !0,
					get: function() {
						return o
					},
					set: function(e) {
						if ("number" != typeof e || e < 0 || i(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
						o = e
					}
				}), s.init = function() {
					void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
				}, s.prototype.setMaxListeners = function(e) {
					if ("number" != typeof e || e < 0 || i(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
					return this._maxListeners = e, this
				}, s.prototype.getMaxListeners = function() {
					return c(this)
				}, s.prototype.emit = function(e) {
					for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
					var i = "error" === e,
						s = this._events;
					if (void 0 !== s) i = i && void 0 === s.error;
					else if (!i) return !1;
					if (i) {
						var o;
						if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
						var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
						throw a.context = o, a
					}
					var c = s[e];
					if (void 0 === c) return !1;
					if ("function" == typeof c) r(c, this, t);
					else {
						var l = c.length,
							d = g(c, l);
						for (n = 0; n < l; ++n) r(d[n], this, t)
					}
					return !0
				}, s.prototype.addListener = function(e, t) {
					return l(this, e, t, !1)
				}, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e, t) {
					return l(this, e, t, !0)
				}, s.prototype.once = function(e, t) {
					return a(t), this.on(e, u(this, e, t)), this
				}, s.prototype.prependOnceListener = function(e, t) {
					return a(t), this.prependListener(e, u(this, e, t)), this
				}, s.prototype.removeListener = function(e, t) {
					var n, r, i, s, o;
					if (a(t), void 0 === (r = this._events)) return this;
					if (void 0 === (n = r[e])) return this;
					if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
					else if ("function" != typeof n) {
						for (i = -1, s = n.length - 1; s >= 0; s--)
							if (n[s] === t || n[s].listener === t) {
								o = n[s].listener, i = s;
								break
							} if (i < 0) return this;
						0 === i ? n.shift() : function(e, t) {
							for (; t + 1 < e.length; t++) e[t] = e[t + 1];
							e.pop()
						}(n, i), 1 === n.length && (r[e] = n[0]), void 0 !== r.removeListener && this.emit("removeListener", e, o || t)
					}
					return this
				}, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(e) {
					var t, n, r;
					if (void 0 === (n = this._events)) return this;
					if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
					if (0 === arguments.length) {
						var i, s = Object.keys(n);
						for (r = 0; r < s.length; ++r) "removeListener" !== (i = s[r]) && this.removeAllListeners(i);
						return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
					}
					if ("function" == typeof(t = n[e])) this.removeListener(e, t);
					else if (void 0 !== t)
						for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
					return this
				}, s.prototype.listeners = function(e) {
					return h(this, e, !0)
				}, s.prototype.rawListeners = function(e) {
					return h(this, e, !1)
				}, s.listenerCount = function(e, t) {
					return "function" == typeof e.listenerCount ? e.listenerCount(t) : p.call(e, t)
				}, s.prototype.listenerCount = p, s.prototype.eventNames = function() {
					return this._eventsCount > 0 ? t(this._events) : []
				}
			}
		},
		t = {};

	function n(r) {
		var i = t[r];
		if (void 0 !== i) return i.exports;
		var s = t[r] = {
			exports: {}
		};
		return e[r](s, s.exports, n), s.exports
	}
	return n.n = e => {
		var t = e && e.__esModule ? () => e.default : () => e;
		return n.d(t, {
			a: t
		}), t
	}, n.d = (e, t) => {
		for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
			enumerable: !0,
			get: t[r]
		})
	}, n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n(872)
})()));
//# sourceMappingURL=external_api.min.js.map