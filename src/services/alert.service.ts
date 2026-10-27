import Swal from "sweetalert2";

export class AlertService {
    static error(title: string, text: string) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,

            // Turn off styling so bootstrap can take over
            buttonsStyling: false,

            customClass: {
                popup: 'rounded-4 shadow-lg border border-dark-subtle bg-body',
                title: 'fs-3 fw-bold text-light',
                htmlContainer: 'text-secondary',
                confirmButton: 'btn btn-danger px-4 py-2 mx-2',
                cancelButton: 'btn btn-outline-light px-4 py-2 mx-2'
            },

            // showCancelButton: true,
            confirmButtonText: 'Ok',
            // cancelButtonText: 'Cancel'
        });
    }

    static success(title: string, text: string, onConfirm?: () => void) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            
            buttonsStyling: false,
            
            customClass: {
                popup: 'rounded-4 shadow-lg border border-dark-subtle bg-body',
                title: 'fs-3 fw-bold text-light',
                htmlContainer: 'text-secondary',
                // Changed to btn-success for a positive action
                confirmButton: 'btn btn-success px-4 py-2 mx-2' 
            },
            
            confirmButtonText: 'Ok'
        }).then((result) => {
            // Execute the callback if it was provided and the user clicked Ok
            if (result.isConfirmed && onConfirm) {
                onConfirm();
            }
        });
    }

    static confirm(title: string, text: string, onYes?: () => void, onNo?: () => void) {
        Swal.fire({
            icon: 'question',
            title: title,
            text: text,
            
            buttonsStyling: false,
            
            customClass: {
                popup: 'rounded-4 shadow-lg border border-dark-subtle bg-body',
                title: 'fs-3 fw-bold text-light',
                htmlContainer: 'text-secondary',
                // Primary for Yes, Outline for No
                confirmButton: 'btn btn-primary px-4 py-2 mx-2',
                cancelButton: 'btn btn-outline-light px-4 py-2 mx-2'
            },
            
            showCancelButton: true,
            confirmButtonText: 'Da',
            cancelButtonText: 'Ne'
        }).then((result) => {
            if (result.isConfirmed) {
                // Execute onYes if user clicked 'Yes'
                if (onYes) onYes();
            } else if (result.isDismissed) {
                // Execute onNo if user clicked 'No', hit Esc, or clicked the backdrop
                if (onNo) onNo();
            }
        });
    }
}