import Comment from './comment.model.js';

// 1. Agregar comentario
export const addComment = async (req, res) => {
    try {
        const data = req.body;
        const comment = new Comment(data);
        await comment.save();

        return res.status(201).json({
            success: true,
            message: 'Comentario agregado con éxito'
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al comentar' });
    }
};

// 2. Editar comentario (Solo el autor)
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid, ...data } = req.body; // uid es quien intenta editar

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        // VALIDACIÓN: ¿Es el dueño del comentario?
        if (comment.autor.toString() !== uid) {
            return res.status(401).json({ success: false, message: 'No puedes editar comentarios ajenos' });
        }

        const updated = await Comment.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json({ success: true, updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al actualizar comentario' });
    }
};

// 3. Eliminar comentario (Solo el autor)
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

        if (comment.autor.toString() !== uid) {
            return res.status(401).json({ success: false, message: 'No puedes eliminar este comentario' });
        }

        await Comment.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Comentario eliminado' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error al eliminar comentario' });
    }
};