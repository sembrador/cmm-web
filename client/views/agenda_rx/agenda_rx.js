Template.AgendaRx.onCreated(function() {
	
});

Template.AgendaRx.onDestroyed(function() {
	
});

Template.AgendaRx.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AgendaRx.events({
	
});

Template.AgendaRx.helpers({
	
});


var isPast = function isPast(date) {
  var today = moment().format();
  return moment(today).isAfter(date);
};

var closeModal = function closeModal() {
  $('#add-edit-event-modal').modal('hide');
  // document.getElementById("add-edit-event-form").reset();
  $('.modal-backdrop').fadeOut();
};

Template.agenda_rx.helpers({	
});

Template.agenda_rx.onCreated(function () {
  var template = Template.instance();
  template.subscribe('aop_agenda_list');
});

Template.agenda_rx.onRendered(function () {
  $('#events-calendar').fullCalendar({
    lang: 'es',
    events: function events(start, end, timezone, callback) {
      var data = AopAgenda.find().fetch().map(function (event) {
        event.editable = !isPast(event.start);
        return event;
      });

      if (data) {
        callback(data);
      }
    },
    allDayDefault: false,
    businessHours: {
      dow: [ 1, 2, 3, 4, 5 ],
      start: '06:00',
      end: '18:00'
    },
    firstDay: 0,
    weekNumbers: true,
    timeFormat: 'H(:mm)',
    header: {
              left: 'today prev,next',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
    },
    eventRender: function eventRender(event, element) {
      element.find('.fc-content').html(
        event.title +
        '<p class="guest-count">' + event.guests + ' Invitados</p>' +
        '<p class="type-' + event.type + '">' + event.type + '</p>'
      );
    },
    eventDrop: function eventDrop(event, delta, revert) {
      var date = event.start.format();
      if (!isPast(date)) {
        var update = {
          _id: event._id,
          start: date,
          end: date
        };
        Meteor.call('aopAgendaUpdate', update, function (error) {
          if (error) {
            toastr.error(error.reason);
          }
        });
      } else {
        revert();
        toastr.warning('No puede mover eventos al pasado!');
      }
    },
    dayClick: function dayClick(date) {
      Session.set('eventModal', { type: 'add', date: date.format() });
      $('#add-edit-event-modal').modal('show');
    },
    eventClick: function eventClick(event) {
      Session.set('eventModal', { type: 'edit', event: event._id });
      $('#add-edit-event-modal').modal('show');
    }
  });
  Tracker.autorun(function () {
    AopAgenda.find().fetch();
    $('#events-calendar').fullCalendar('refetchEvents');
  });
});

Template.addEditEventModal.helpers({
  modalType: function modalType(type) {
    var eventModal = Session.get('eventModal');
    if (eventModal) {
      return eventModal.type === type;
    }
  },
  modalLabel: function modalLabel() {
    var eventModal = Session.get('eventModal');

    if (eventModal) {
      return {
        button: eventModal.type === 'edit' ? 'Guardar' : 'Guardar',
        label: eventModal.type === 'edit' ? 'Editar' : 'Agregar'
      };
    }
  },
  selected: function selected(v1, v2) {
    return v1 === v2;
  },
  event: function event() {
    var eventModal = Session.get('eventModal');

    if (eventModal) {
      return eventModal.type === 'edit' ? AopAgenda.findOne(eventModal.event) : {
        start: eventModal.date,
        end: eventModal.date
      };
    }
  }
});

Template.addEditEventModal.events({
  'submit form': function submitForm(event, template) {
    event.preventDefault();

    var eventModal = Session.get('eventModal'),
        submitMsg = eventModal.type === 'edit' ? 'editado!' : 'agregado!',
        submitType = eventModal.type === 'edit' ? 'aopAgendaUpdate' : 'aopAgendaInsert',
        eventItem = {
          title: template.find('[name="title"]').value,
          start: template.find('[name="start"]').value,
          end: template.find('[name="end"]').value,
          type: template.find('[name="type"] option:selected').value,
          guests: parseInt(template.find('[name="guests"]').value, 10)
        };
    if (submitType === 'aopAgendaUpdate') {
      eventItem._id = eventModal.event;
    }
    Meteor.call(submitType, eventItem, function (error) {
      if (error) {
        toastr.error(error.reason);
      } else {
        toastr.success('Evento ' + submitMsg);
        closeModal();
      }
    });
  },
  'click .delete-event': function clickDeleteEvent(event, template) {
		event.preventDefault();
    var eventModal = Session.get('eventModal');
		bootbox.dialog({
			message: "Esta Seguro De Eliminar Este Evento?",
			title: "Eliminar",
			animate: false,
			buttons: {
				success: {
					label: "Si",
					className: "btn-success",
					callback: function() {
            Meteor.call('aopAgendaRemove', eventModal.event, function (error) {
              if (error) {
                toastr.error(error.reason);
              } else {
                toastr.success('Evento Eliminado!');
                closeModal();
              }
            });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	}
});

