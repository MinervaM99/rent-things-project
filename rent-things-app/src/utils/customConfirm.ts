import Swal from "sweetalert2";

export default function customConfirm(
    onConfirm: any,
    title: string = "Dorești să ștergi această categorie?",
    confirmButtonText: string = "Sterge"
){
    Swal.fire({
        title,
        confirmButtonText,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
    }).then(result =>{
        if (result.isConfirmed){
            onConfirm();
        }
    })
}